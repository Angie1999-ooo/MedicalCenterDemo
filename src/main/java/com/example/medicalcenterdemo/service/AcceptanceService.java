package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.User;
import com.example.medicalcenterdemo.exeptions.EmailAlreadyUsedException;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AcceptanceService {

  final private  AcceptanceRepository acceptanceRepository;

  final private UserRepository patientRepository;

  final private MailSender mailSender;

    public AcceptanceService(AcceptanceRepository acceptanceRepository, UserRepository patientRepository, MailSender mailSender) {
        this.acceptanceRepository = acceptanceRepository;
        this.patientRepository = patientRepository;
        this.mailSender = mailSender;
    }

    public Acceptance addAcceptance( LocalDateTime startDate,  LocalDateTime endDate, Doctor doctor,  User patient)
    {

        if (patient.getId() != null) {
            throw new EntityAlreadyExist();
        }

        if (patientRepository.findByEmail(patient.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        }

        mailSender.send(patient.getEmail(),"Медицинский центр","Вы зписаны на приём ");
        User newPatient  =  patientRepository.save(patient);
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
