package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.exeptions.EmailAlreadyUsedException;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AcceptanceService {

    @Autowired
    AcceptanceRepository acceptanceRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    MailSender mailSender;

    public Acceptance addAcceptance( LocalDateTime startDate,  LocalDateTime endDate, Doctor doctor,  Patient patient)
    {

        if (patient.getId() != null) {

            throw new EntityAlreadyExist();
        }

        if (patientRepository.getPatientByEmail(patient.getEmail()).isPresent()) {

            throw new EmailAlreadyUsedException();
        }


        mailSender.send(patient.getEmail(),"Медицинский центр","Вы зписаны на приём ");

        Patient newPatient  =  patientRepository.save(patient);

        Acceptance acceptance = new Acceptance(newPatient,doctor,startDate,endDate);

        return acceptanceRepository.save(acceptance);
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
