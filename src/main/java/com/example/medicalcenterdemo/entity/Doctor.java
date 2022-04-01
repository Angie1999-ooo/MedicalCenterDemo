package com.example.medicalcenterdemo.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.Objects;

@Entity
//@Where(clause = "DELETED = 0")
@Getter
@Setter
@ToString
@AllArgsConstructor
@EnableAutoConfiguration
@NoArgsConstructor
@Table(name="doctor")
public class Doctor {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private String middleName;
    private String photo;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REFRESH)
    @JoinColumn(name = "speciality")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Speciality speciality;
    private String education;


    public Doctor typeSpeciality(Speciality speciality) {
        this.speciality = speciality;
        return this;
    }

    public Speciality getSpeciality(){
        return speciality;
    }

    public void setSpeciality(Speciality speciality){
       this.speciality=speciality;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Doctor doctor = (Doctor) o;
        return Objects.equals(id, doctor.id) && Objects.equals(firstName, doctor.firstName) && Objects.equals(secondName, doctor.secondName) && Objects.equals(middleName, doctor.middleName) && Objects.equals(photo, doctor.photo) && Objects.equals(speciality, doctor.speciality) && Objects.equals(education, doctor.education);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, secondName, middleName, photo, speciality, education);
    }

}
