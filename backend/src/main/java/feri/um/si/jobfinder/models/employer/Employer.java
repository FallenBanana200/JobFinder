package feri.um.si.jobfinder.models.employer;

import feri.um.si.jobfinder.models.employee.Employee;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employer {

    private String companyName;
    private String companyMail;
    private int contactNumber;
    private String location;
    private String bio;
    private String expectations;
    private String picture;
    private int salary;
    private ArrayList<String> matches;
}