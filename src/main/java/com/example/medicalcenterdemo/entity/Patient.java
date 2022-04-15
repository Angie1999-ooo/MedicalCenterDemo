package com.example.medicalcenterdemo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.awt.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
//@Where(clause = "DELETED = 0")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="patient")
public class Patient implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private String middleName;
    private String email;
    private String phone;

    @OneToMany(cascade= CascadeType.ALL, mappedBy = "patient")
    private List<Acceptance> acceptances = new ArrayList<>();

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
