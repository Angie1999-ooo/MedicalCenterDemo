package com.example.medicalcenterdemo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.awt.*;
import java.util.Collection;
import java.util.Objects;

@Entity
//@Where(clause = "DELETED = 0")
@Getter
@Setter
@ToString
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="patient")
public class Patient {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private String middleName;
    private String email;
    private String phone;
    @JsonIgnore
    @OneToMany(cascade= CascadeType.ALL, mappedBy = "patient")
    private Collection<Acceptance> acceptances;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return Objects.equals(id, patient.id) && Objects.equals(firstName, patient.firstName) && Objects.equals(secondName, patient.secondName) && Objects.equals(middleName, patient.middleName) && Objects.equals(email, patient.email) && Objects.equals(phone, patient.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, secondName, middleName, email, phone);
    }
}
