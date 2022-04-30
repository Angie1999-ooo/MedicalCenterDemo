package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.repository.PatientRepository;
import com.example.medicalcenterdemo.service.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/patient")
public class PatientController {

    private final Logger log = LoggerFactory.getLogger(PatientController.class);


    private  final PatientService patientService;

    private  final PatientRepository patientRepository;

    public PatientController(PatientService patientService, PatientRepository patientRepository) {
        this.patientService = patientService;
        this.patientRepository = patientRepository;
    }


    @GetMapping
    @PreAuthorize("hasAuthority('developers:write')")
    public ResponseEntity getAll( ) {

        log.info("REST request to get all Patient");

        return  ResponseEntity.ok(patientService.getPatient());

    }

    @GetMapping({"id"})
    public ResponseEntity getOnePatient(@RequestParam Long id) {

        log.info("REST request to get one Patient");

        return ResponseEntity.ok(patientService.getOne(id));
    }

    @PostMapping
    public ResponseEntity addPatient(@RequestBody Patient patient) {

        log.debug("REST request to add Patient : {}", patient);

            return ResponseEntity.ok(patientService.addPatient(patient));
    }

    @PutMapping
    public ResponseEntity updatePatient(@RequestBody Patient patient) {

        try{

            log.debug("REST request to update Patient : {}", patient);

            return ResponseEntity.ok(patientService.updatePatient(patient));
        }
        catch (Exception e) {

            return ResponseEntity.badRequest().body("Failed to change data");
        }
    }


    @DeleteMapping("/{id}")

    public ResponseEntity deletePatient(@PathVariable Long id) {

        try {

            log.debug("REST request to delete Patient : {}", id);

            return ResponseEntity.ok(patientService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error has occurred");
        }
    }
}