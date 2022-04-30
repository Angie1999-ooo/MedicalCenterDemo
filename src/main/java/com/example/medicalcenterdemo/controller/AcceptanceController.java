package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.PatientRepository;
import com.example.medicalcenterdemo.service.AcceptanceService;
import com.example.medicalcenterdemo.service.MailSender;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/acceptance")
public class AcceptanceController {


    private final AcceptanceService acceptanceService;

    private final AcceptanceRepository acceptanceRepository;

    private final PatientRepository patientRepository;

    private final MailSender mailSender;

    public AcceptanceController(AcceptanceService acceptanceService, AcceptanceRepository acceptanceRepository, PatientRepository patientRepository, MailSender mailSender) {
        this.acceptanceService = acceptanceService;
        this.acceptanceRepository = acceptanceRepository;
        this.patientRepository = patientRepository;
        this.mailSender = mailSender;
    }


    @GetMapping
    public ResponseEntity getAllAcceptance() {

        return ResponseEntity.ok(acceptanceService.getAcceptance());
    }

    @GetMapping(params = {"page", "limit"})
    public ResponseEntity getAllByPagable(@RequestParam(value = "page", defaultValue = "1") int page,
                                          @RequestParam(value = "limit", defaultValue = "15") int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return ResponseEntity.ok(acceptanceRepository.findAll(pageable));
    }



    @PostMapping
    public ResponseEntity addAcceptance(@RequestParam (value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, @RequestParam (value = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate, @RequestParam (value = "doctor") Doctor doctor, @RequestBody Patient patient) {

        return ResponseEntity.ok(acceptanceService.addAcceptance(startDate,endDate,doctor,patient));

    }


    @GetMapping({"id"})
    public ResponseEntity getOneAcceptance(@RequestParam Long id) {

        return ResponseEntity.ok(acceptanceService.getOne(id));
    }

    @PutMapping
    @PreAuthorize(" hasAuthority('ADMIN')")
    public ResponseEntity updateAcceptance(@RequestBody Acceptance acceptance) {

        if(acceptance.getId() == null)
        {
            throw new EntityNotExist();
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
