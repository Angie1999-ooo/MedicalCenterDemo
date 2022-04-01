package com.example.medicalcenterdemo.entity;

import lombok.*;
import org.hibernate.annotations.Where;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.Objects;

@Entity
//@Where(clause = "DELETED = 0")
@Getter
@Setter
@ToString
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="speciality")
public class Speciality {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String speciality;

    public Speciality(String speciality) {
        this.speciality = speciality;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Speciality that = (Speciality) o;
        return Objects.equals(id, that.id) && Objects.equals(speciality, that.speciality);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, speciality);
    }
}
