package com.example.medicalcenterdemo.repository;


import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.entity.Timetable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.File;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface DoctorRepository extends JpaRepository<Doctor, Long>, PagingAndSortingRepository<Doctor, Long> {

    Page<Doctor> findAllBySpeciality(Speciality speciality,Pageable pageable);

    List<Doctor> findBySecondName(String secondName);


}
