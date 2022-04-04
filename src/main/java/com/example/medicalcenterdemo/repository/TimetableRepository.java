package com.example.medicalcenterdemo.repository;


import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Timetable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface TimetableRepository extends JpaRepository<Timetable, Long>, PagingAndSortingRepository<Timetable, Long> {

    Page<Timetable> findAllByDoctor(Doctor doctor, Pageable pageable);

    List<Timetable> findByDoctor(Doctor doctor);

}
