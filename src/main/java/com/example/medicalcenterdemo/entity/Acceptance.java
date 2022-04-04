package com.example.medicalcenterdemo.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="acceptance")
public class Acceptance implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient")
    @NotNull
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    @NotNull
    private Doctor doctor;
    private LocalDateTime startDate;
    private LocalDateTime endDate;



    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public Acceptance(Patient patient,Doctor doctor,LocalDateTime startDate,LocalDateTime endDate) {
        this.patient = patient;
        this.doctor = doctor;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public Long getId() {
        return id;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public Patient getPatient() {
        return patient;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

    public Doctor getDoctor() {
        return doctor;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public LocalDateTime getStartDate() {
        return startDate;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public LocalDateTime  getEndDate() {
        return endDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
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
