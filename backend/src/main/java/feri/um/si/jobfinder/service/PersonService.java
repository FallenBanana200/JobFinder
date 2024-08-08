package feri.um.si.jobfinder.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import feri.um.si.jobfinder.models.employee.Employee;
import feri.um.si.jobfinder.models.employer.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PersonService {

    @Autowired
    Firestore db;

    public void updateLikes(String id, Object obj) {
        try {
            if (obj instanceof Employer employer) {
                DocumentReference employeeDocRef = db.collection("employee").document(id);

                // Preveri, če dokument obstaja
                DocumentSnapshot employeeSnapshot = employeeDocRef.get().get();
                if (!employeeSnapshot.exists()) {
                    System.out.println("Employee document with ID " + id + " does not exist.");
                    return;
                }

                // Run a transaction for consistency
                db.runTransaction((Transaction.Function<Void>) transaction -> {
                    var snapshot = transaction.get(employeeDocRef).get();

                    // Update employee's likedBy list
                    transaction.update(employeeDocRef, "myLikes", FieldValue.arrayUnion(employer.getCompanyEmail()));

                    // Check for mutual like
                    List<String> employeeLikedBy = (List<String>) snapshot.get("likedBy");
                    if (employeeLikedBy != null && employeeLikedBy.contains(employer.getCompanyEmail())) {
                        // Update both parties with a match
                        transaction.update(employeeDocRef, "matches", FieldValue.arrayUnion(employer.getCompanyEmail()));
                        DocumentReference employerDocRef = db.collection("employer").document(employer.getCompanyEmail());
                        transaction.update(employerDocRef, "matches", FieldValue.arrayUnion(id));
                    }

                    return null;
                }).get();

                System.out.println("Updated likes for employee and checked for match.");

            } else if (obj instanceof Employee employee) {
                DocumentReference employerDocRef = db.collection("employer").document(id);

                // Preveri, če dokument obstaja
                DocumentSnapshot employerSnapshot = employerDocRef.get().get();
                if (!employerSnapshot.exists()) {
                    System.out.println("Employer document with ID " + id + " does not exist.");
                    return;
                }

                // Run a transaction for consistency
                db.runTransaction((Transaction.Function<Void>) transaction -> {

                    var employeeDocRef = db.collection("employee").document(employee.getEmail());

                    // Preveri, če dokument obstaja
                    DocumentSnapshot employeeSnapshot = employeeDocRef.get().get();
                    if (!employeeSnapshot.exists()) {
                        System.out.println("Employee document with email " + employee.getEmail() + " does not exist.");
                        return null;
                    }

                    System.out.println(employee.getEmail());
                    System.out.println(employeeDocRef);

                    // Update employee's myLikes list
                    transaction.update(employeeDocRef, "likedBy", FieldValue.arrayUnion(id));

                    // Check for mutual like
                    List<String> employeeMyLikes = (List<String>) employeeSnapshot.get("myLikes");
                    if (employeeMyLikes != null && employeeMyLikes.contains(id)) {
                        // Update both parties with a match
                        transaction.update(employeeDocRef, "matches", FieldValue.arrayUnion(id));
                        transaction.update(employerDocRef, "matches", FieldValue.arrayUnion(employee.getEmail()));
                    }

                    return null;
                }).get();

                System.out.println("Updated likes for employer and checked for match.");

            } else {
                throw new IllegalArgumentException("Invalid entity type");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}