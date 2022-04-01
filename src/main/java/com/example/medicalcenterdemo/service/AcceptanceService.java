package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AcceptanceService {

    @Autowired
    AcceptanceRepository acceptanceRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    MailSender mailSender;

    public Acceptance addAcceptance(Acceptance acceptance)
    {

        patientRepository.save(acceptance.getPatient());

        mailSender.send(acceptance.getPatient().getEmail(),"","Hello");

        acceptanceRepository.save(acceptance);

        return acceptance;
    }

    public List<Acceptance> getAcceptance()
    {

        return acceptanceRepository.findAll();
    }

    public Acceptance getOne(Long id)
    {
        return  acceptanceRepository.findById(id).get();
    }

    public Long delete(Long id) {
        acceptanceRepository.deleteById(id);
        return id;
    }

}
