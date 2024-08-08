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

    private String getEmployerEmailById(String employerId) throws ExecutionException, InterruptedException {
        DocumentReference employerDocRef = db.collection("employer").document(employerId);
        ApiFuture<DocumentSnapshot> future = employerDocRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            String email = document.getString("companyMail");
            System.out.println("Employer email: " + email);
            return email;
        } else {
            System.out.println("No such document!");
            return null;
        }
    }


    public void updateLikes(String id, Object obj) {
        try {
            if (obj instanceof Employer employer) {
                DocumentReference employeeDocRef = db.collection("employee").document(id);
                System.out.println(employer);

                DocumentSnapshot employeeSnapshot = employeeDocRef.get().get();
                if (!employeeSnapshot.exists()) {
                    System.out.println("Employee document with ID " + id + " does not exist.");
                    return;
                }

                db.runTransaction((Transaction.Function<Void>) transaction -> {
                    var snapshot = transaction.get(employeeDocRef).get();

                    transaction.update(employeeDocRef, "myLikes", FieldValue.arrayUnion(employer.getCompanyMail()));

                    List<String> employeeLikedBy = (List<String>) snapshot.get("likedBy");
                    if (employeeLikedBy != null && employeeLikedBy.contains(employer.getCompanyMail())) {
                        transaction.update(employeeDocRef, "matches", FieldValue.arrayUnion(employer.getCompanyMail()));
                        DocumentReference employerDocRef = db.collection("employer").document(employer.getCompanyMail());
                        transaction.update(employerDocRef, "matches", FieldValue.arrayUnion(id));
                    }

                    return null;
                }).get();

                System.out.println("Updated likes for employee and checked for match.");

            } else if (obj instanceof Employee employee) {
                DocumentReference employerDocRef = db.collection("employer").document(id);

                ApiFuture<DocumentSnapshot> future = employerDocRef.get();
                DocumentSnapshot employerSnapshot = future.get();
                if (!employerSnapshot.exists()) {
                    System.out.println("Employer document with ID " + id + " does not exist.");
                    return;
                }

                System.out.println("Employer document found: " + employerSnapshot.getId());

                if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
                    System.out.println("Employee email is null or empty.");
                    return;
                }

                CollectionReference employeeCollection = db.collection("employee");
                Query query = employeeCollection.whereEqualTo("email", employee.getEmail());
                ApiFuture<QuerySnapshot> querySnapshot = query.get();

                List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
                if (documents.isEmpty()) {
                    System.out.println("Employee document with email " + employee.getEmail() + " does not exist.");
                    return;
                }

                DocumentReference employeeDocRef = documents.get(0).getReference();
                DocumentSnapshot employeeSnapshot = employeeDocRef.get().get();

                System.out.println("Employee document found: " + employeeSnapshot.getId());

                db.runTransaction((Transaction.Function<Void>) transaction -> {
                    transaction.update(employeeDocRef, "likedBy", FieldValue.arrayUnion(getEmployerEmailById(id)));

                    List<String> employeeMyLikes = (List<String>) employeeSnapshot.get("myLikes");
                    if (employeeMyLikes != null && employeeMyLikes.contains(id)) {
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
