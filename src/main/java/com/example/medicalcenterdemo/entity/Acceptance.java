package com.example.medicalcenterdemo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
@Data
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="acceptance")
public class Acceptance {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient")
    @NotNull
    @JsonIgnore
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    @NotNull
    @JsonIgnore
    private Doctor doctor;


    public Acceptance(Patient patient,Doctor doctor,LocalDateTime startDate,LocalDateTime endDate) {
        this.patient = patient;
        this.doctor = doctor;
        this.startDate = startDate;
        this.endDate = endDate;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Acceptance that = (Acceptance) o;
        return Objects.equals(id, that.id) && Objects.equals(patient, that.patient) && Objects.equals(doctor, that.doctor) && Objects.equals(startDate, that.startDate) && Objects.equals(endDate, that.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, patient, doctor,startDate,endDate);
    }
}
