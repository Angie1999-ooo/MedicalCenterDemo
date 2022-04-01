package com.example.medicalcenterdemo.repository;


import com.example.medicalcenterdemo.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> getPatientByEmail(String email);

}
