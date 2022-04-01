package com.example.medicalcenterdemo.repository;


import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SpecialityRepository extends JpaRepository<Speciality, Long> {


}
