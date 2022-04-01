package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.exeptions.EmailAlreadyUsedException;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.PatientRepository;
import com.example.medicalcenterdemo.service.AcceptanceService;
import com.example.medicalcenterdemo.service.DoctorService;
import com.example.medicalcenterdemo.service.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/acceptance")
public class AcceptanceController {

    @Autowired
    private AcceptanceService acceptanceService;

    @Autowired
    AcceptanceRepository acceptanceRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    MailSender mailSender;


    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public ResponseEntity getAllAcceptance() {

        return ResponseEntity.ok(acceptanceRepository.findAll());
    }

    @PostMapping
    public ResponseEntity addAcceptance(@RequestParam (value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, @RequestParam (value = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate, @RequestParam (value = "doctor") Doctor doctor, @RequestBody Patient patient) {

        if (patient.getId() != null) {

            throw new EntityAlreadyExist();
        }

        if (patientRepository.getPatientByEmail(patient.getEmail()).isPresent()) {

            throw new EmailAlreadyUsedException();
        }


        mailSender.send(patient.getEmail(),"Медицинский центр","Вы зписаны на приём ");


        Patient newPatient  =  patientRepository.save(patient);

        Acceptance acceptance = new Acceptance(newPatient,doctor,startDate,endDate);


        return ResponseEntity.ok(acceptanceRepository.save(acceptance));

    }



    @GetMapping({"id"})
    public ResponseEntity getOneAcceptance(@RequestParam Long id) {

        return ResponseEntity.ok(acceptanceService.getOne(id));
    }

    @PutMapping
    public ResponseEntity updateAcceptance(@RequestBody Acceptance acceptance) throws Exception {

        if(acceptance.getId() == null)
        {
            throw new Exception("Error");
        }
        Acceptance result = acceptanceRepository.save(acceptance);

        return ResponseEntity.ok(result.getId());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteAcceptance(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(acceptanceService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка");
        }
    }

}
