package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.repository.PatientRepository;
import com.example.medicalcenterdemo.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    PatientRepository patientRepository;


    @GetMapping
    public ResponseEntity getAll( ) {

        return  ResponseEntity.ok(patientRepository.findAll());

    }

    @GetMapping({"id"})
    public ResponseEntity getOnePatient(@RequestParam Long id) {

        return ResponseEntity.ok(patientService.getOne(id));
    }

    @PostMapping
    public ResponseEntity addPatient(@RequestBody Patient patient) {

            return ResponseEntity.ok(patientService.addPatient(patient));
    }

    @PutMapping
    public ResponseEntity updatePatient(@RequestBody Patient patient) {

        try{
            return ResponseEntity.ok(patientService.updatePatient(patient));
        }
        catch (Exception e) {

            return ResponseEntity.badRequest().body("Не удалось изменить данные");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deletePatient(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(patientService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка");
        }
    }
}