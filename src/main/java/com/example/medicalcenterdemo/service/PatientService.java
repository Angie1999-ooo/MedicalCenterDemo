package com.example.medicalcenterdemo.service;
import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Patient;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    @Autowired
    AcceptanceRepository acceptanceRepository;

    @Autowired
    MailSender mailSender;

    public Patient addPatient(Patient patient) throws EntityAlreadyExist {

        if (patient.getId() != null) {

            throw new EntityAlreadyExist();

        }
        else {

            patientRepository.save(patient);
        }

        return patient;
    }

    public Patient updatePatient(Patient patient) throws EntityNotExist
    {
        if(patient.getId()==null)
        {
            throw new EntityNotExist();
        }

        return  patientRepository.save(patient);
    }

    public List<Patient> getPatient()
    {
        return patientRepository.findAll();
    }

    public Patient getOne(Long id)
    {
        return  patientRepository.findById(id).get();
    }

    public Long delete(Long id) {

    Optional <Patient> patient  = patientRepository.findById(id);

        Optional<Acceptance> acceptance =  acceptanceRepository.findByPatient(patient.get());

        acceptanceRepository.deleteById(acceptance.get().getId());

        patientRepository.deleteById(id);

        return id;
    }
}
