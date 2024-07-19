package feri.um.si.jobfinder.controllers;

import com.google.cloud.firestore.*;
import feri.um.si.jobfinder.models.employer.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/employer")
public class EmployerController {

    @Autowired
    private Firestore firestore;

    @GetMapping("/{id}")
    public Employer getEmployerById(@PathVariable String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("employer").document(id);
        DocumentSnapshot document = docRef.get().get();
        if (document.exists()) {
            return document.toObject(Employer.class);
        } else {
            throw new RuntimeException("No such document!");
        }
    }

    @GetMapping("/")
    public Map<String, Employer> getAllEmployers() throws ExecutionException, InterruptedException {
        CollectionReference collection = firestore.collection("employer");
        Iterable<QueryDocumentSnapshot> documents = collection.get().get().getDocuments();

        Map<String, Employer> employers = new HashMap<>();
        for (QueryDocumentSnapshot document : documents) {
            employers.put(document.getId(), document.toObject(Employer.class));
        }
        return employers;
    }

    @PostMapping("/create")
    public String createEmployer(@RequestBody Employer employer) {
        try {
            CollectionReference collection = firestore.collection("employer");
            Map<String, Object> employerData = new HashMap<>();
            employerData.put("companyName", employer.getCompanyName());
            employerData.put("companyEmail", employer.getCompanyEmail());
            employerData.put("contactNumber", employer.getContactNumber());
            employerData.put("location", employer.getLocation());
            employerData.put("bio", employer.getBio());
            employerData.put("expectations", employer.getExpectations());
            employerData.put("salary", employer.getSalary());

            collection.add(employerData);
            return "Employer created successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create employer: " + e.getMessage();
        }
    }

    @PutMapping("/update/{id}")
    public String updateEmployer(@PathVariable String id, @RequestBody Employer employer) {
        try {
            DocumentReference docRef = firestore.collection("employer").document(id);
            Map<String, Object> updates = new HashMap<>();
            updates.put("companyName", employer.getCompanyName());
            updates.put("companyEmail", employer.getCompanyEmail());
            updates.put("contactNumber", employer.getContactNumber());
            updates.put("location", employer.getLocation());
            updates.put("bio", employer.getBio());
            updates.put("expectations", employer.getExpectations());
            updates.put("salary", employer.getSalary());

            docRef.set(updates, SetOptions.merge());
            return "Employer updated successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to update employer: " + e.getMessage();
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEmployer(@PathVariable String id) {
        try {
            DocumentReference docRef = firestore.collection("employer").document(id);
            docRef.delete();
            return "Employer deleted successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to delete employer: " + e.getMessage();
        }
    }
}
