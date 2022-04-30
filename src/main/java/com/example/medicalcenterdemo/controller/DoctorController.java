package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Doctor;

import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import com.example.medicalcenterdemo.service.DoctorService;
;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URISyntaxException;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private final Logger log = LoggerFactory.getLogger(DoctorController.class);

    private final DoctorService doctorService;

    private final DoctorRepository doctorRepository;

    private final TimetableRepository timetableRepository;

    public DoctorController(DoctorService doctorService, DoctorRepository doctorRepository, TimetableRepository timetableRepository) {
        this.doctorService = doctorService;
        this.doctorRepository = doctorRepository;
        this.timetableRepository = timetableRepository;
    }


    @GetMapping(params = {"page", "limit"})
    public ResponseEntity getAllBy(@RequestParam(value = "page", defaultValue = "1") int page,
                                   @RequestParam(value = "limit", defaultValue = "5") int limit) {

        log.info("REST request to get all Doctor");

        return  ResponseEntity.ok(doctorService.getAll(page,limit));

    }

    @GetMapping(params = {"speciality", "page", "limit"})
    public ResponseEntity getAllByspeciality(@RequestParam(value = "speciality") Speciality speciality, @RequestParam(value = "page", defaultValue = "1") int page,
                                             @RequestParam(value = "limit", defaultValue = "5") int limit) {

        log.info("REST request to get all Doctor by Speciality");

        return ResponseEntity.ok(doctorService.getAllBySpeciality(speciality, page, limit));

    }

    @GetMapping(params={"fullName", "page", "limit"})
    public ResponseEntity getByName(@RequestParam(value="fullName")String fullName,@RequestParam(value = "page", defaultValue = "1") int page,
                                    @RequestParam(value = "limit", defaultValue = "20") int limit )
    {
        log.info("REST request to get all Doctor by FullName");

        Pageable pageable = PageRequest.of(page, limit);

        return  ResponseEntity.ok(doctorRepository.findByFullName(fullName, pageable));
    }


    @GetMapping("{id}")
    public ResponseEntity getOne(@PathVariable Long id) {

        log.debug("REST request to get Doctor : {}", id);

        return ResponseEntity.ok(doctorService.getOne(id));
    }


    @PostMapping
    public ResponseEntity addDoctor(@RequestBody Doctor doctor) throws URISyntaxException {

        try {
            log.debug("REST request to add Doctor : {}", doctor);
            return ResponseEntity.ok(doctorService.addDoctor(doctor));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Can't create ");
        }
    }


    @PutMapping
    public ResponseEntity updateDoctor(@RequestBody Doctor doctor) throws URISyntaxException {

        log.debug("REST request to update Doctor : {}", doctor);

        if (doctor.getId() == null) {

         throw new EntityNotExist();

        }

        return ResponseEntity.ok(doctorService.updateDoctor(doctor));

    }


    @DeleteMapping("{id}")
    public ResponseEntity deleteDoctor(@PathVariable Long id) {

        try {
            log.debug("REST request to delete Doctor : {}", id);
            return ResponseEntity.ok(doctorService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error has occurred");
        }
    }

}