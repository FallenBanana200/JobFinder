package feri.um.si.jobfinder.models.employee;

import feri.um.si.jobfinder.models.employer.Employer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    private String name;
    private String lastName;
    private int age;
    private String bio;
    private String competences;
    private String picture;
    private String email;
    private ArrayList<Employer> likedBy;
    private ArrayList<Employer> myLikes;
    private ArrayList<Employer> matches;
}
