package feri.um.si.jobfinder.controllers;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import feri.um.si.jobfinder.models.employee.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private Firestore firestore;

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        try {
            DocumentReference docRef = firestore.collection("employee").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                Employee employee = document.toObject(Employee.class);
                return new ResponseEntity<>(employee, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Employee>> getAllEmployees() {
        try {
            CollectionReference collection = firestore.collection("employee");
            ApiFuture<QuerySnapshot> future = collection.get();
            QuerySnapshot querySnapshot = future.get();

            Map<String, Employee> employees = new HashMap<>();
            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                employees.put(document.getId(), document.toObject(Employee.class));
            }
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        try {
            CollectionReference collection = firestore.collection("employee");
            Map<String, Object> employeeData = new HashMap<>();
            employeeData.put("name", employee.getName());
            employeeData.put("lastName", employee.getLastName());
            employeeData.put("age", employee.getAge());
            employeeData.put("bio", employee.getBio());
            employeeData.put("competences", employee.getCompetences());
            employeeData.put("picture", employee.getPicture());

            collection.add(employeeData);
            return new ResponseEntity<>("Employee created successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create employee: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable String id, @RequestBody Employee employee) {
        try {
            DocumentReference docRef = firestore.collection("employee").document(id);
            Map<String, Object> updates = new HashMap<>();
            updates.put("name", employee.getName());
            updates.put("lastName", employee.getLastName());
            updates.put("age", employee.getAge());
            updates.put("bio", employee.getBio());
            updates.put("competences", employee.getCompetences());
            updates.put("picture", employee.getPicture());

            docRef.set(updates, SetOptions.merge());
            return new ResponseEntity<>("Employee updated successfully!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update employee: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String id) {
        try {
            DocumentReference docRef = firestore.collection("employee").document(id);
            docRef.delete();
            return new ResponseEntity<>("Employee deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete employee: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
