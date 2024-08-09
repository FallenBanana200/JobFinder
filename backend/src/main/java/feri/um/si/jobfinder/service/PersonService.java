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

    private String getEmailById(String collectionName, String documentId, String emailField) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(collectionName).document(documentId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            String email = document.getString(emailField);
            System.out.println("Email: " + email);
            return email;
        } else {
            System.out.println("No such document in collection " + collectionName + " with ID " + documentId);
            return null;
        }
    }

    private DocumentReference getDocumentReference(String collection, String field, String value) throws ExecutionException, InterruptedException {
        CollectionReference collectionRef = db.collection(collection);
        Query query = collectionRef.whereEqualTo(field, value);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        if (documents.isEmpty()) {
            System.out.println("No document found in collection " + collection + " with " + field + " = " + value);
            return null;
        }

        return documents.get(0).getReference();
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
                        DocumentReference employerDocRef = getDocumentReference("employer", "companyMail", employer.getCompanyMail());

                        if (employerDocRef != null) {
                            transaction.update(employeeDocRef, "matches", FieldValue.arrayUnion(employer.getCompanyMail()));
                            transaction.update(employerDocRef, "matches", FieldValue.arrayUnion(getEmailById("employee", id, "email")));
                        }
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

                DocumentReference employeeDocRef = getDocumentReference("employee", "email", employee.getEmail());
                assert employeeDocRef != null;
                DocumentSnapshot employeeSnapshot = employeeDocRef.get().get();

                System.out.println("Employee document found: " + employeeSnapshot.getId());

                db.runTransaction((Transaction.Function<Void>) transaction -> {
                    transaction.update(employeeDocRef, "likedBy", FieldValue.arrayUnion(getEmailById("employer", id, "companyMail")));

                    List<String> employeeMyLikes = (List<String>) employeeSnapshot.get("myLikes");
                    System.out.println(employeeMyLikes);
                    if (employeeMyLikes != null && employeeMyLikes.contains(getEmailById("employer", id, "companyMail"))) {
                        transaction.update(employeeDocRef, "matches", FieldValue.arrayUnion(getEmailById("employer", id, "companyMail")));
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
