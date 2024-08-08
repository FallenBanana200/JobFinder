package feri.um.si.jobfinder.models.employer;

import feri.um.si.jobfinder.models.employee.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employer {

    private String companyName;
    private String companyEmail;
    private int contactNumber;
    private String location;
    private String bio;
    private String expectations;
    private int salary;
    private ArrayList<Employee> matched;
}
