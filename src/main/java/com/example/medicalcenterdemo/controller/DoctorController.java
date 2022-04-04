package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;

import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.entity.Timetable;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import com.example.medicalcenterdemo.service.DoctorService;
;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URISyntaxException;
import java.sql.Time;
import java.util.*;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    TimetableRepository timetableRepository;


    @GetMapping(params = {"page", "limit"})
    public ResponseEntity getAllBy(@RequestParam(value = "page", defaultValue = "1") int page,
                                   @RequestParam(value = "limit", defaultValue = "5") int limit) {

        return  ResponseEntity.ok(doctorService.getAll(page,limit));

    }

    @GetMapping(params = {"speciality", "page", "limit"})
    public ResponseEntity getAllByspeciality(@RequestParam(value = "speciality") Speciality speciality, @RequestParam(value = "page", defaultValue = "1") int page,
                                             @RequestParam(value = "limit", defaultValue = "5") int limit) {
        
        return ResponseEntity.ok(doctorService.getAllBySpeciality(speciality, page, limit));

    }

    @GetMapping(params={"fullName", "page", "limit"})
    public ResponseEntity getByName(@RequestParam(value="fullName")String fullName, @RequestParam(value = "page", defaultValue = "1") int page,
                                    @RequestParam(value = "limit", defaultValue = "20") int limit ){

        return  ResponseEntity.ok(doctorService.getByName(fullName,page, limit));
    }


    @GetMapping("{id}")
    public ResponseEntity getOne(@PathVariable Long id) {

        return ResponseEntity.ok(doctorService.getOne(id));
    }


    @PostMapping
    public ResponseEntity addDoctor(@RequestBody Doctor doctor) throws URISyntaxException {

        try {
            return ResponseEntity.ok(doctorService.addDoctor(doctor));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Can't create ");
        }
    }


    @PutMapping
    public ResponseEntity updateDoctor(@RequestBody Doctor doctor) throws URISyntaxException {
        if (doctor.getId() == null) {

         throw new EntityNotExist();

        }

        return ResponseEntity.ok(doctorService.updateDoctor(doctor));

    }


    @DeleteMapping("{id}")
    public ResponseEntity deletePatient(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(doctorService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка");
        }
    }

}
