package feri.um.si.jobfinder.models.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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

}
