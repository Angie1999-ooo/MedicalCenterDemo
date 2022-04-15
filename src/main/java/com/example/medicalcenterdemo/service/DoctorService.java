package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Acceptance;
import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.entity.Timetable;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.exeptions.SpecialityNotFound;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.SpecialityRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    @Autowired
    AcceptanceRepository acceptanceRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    SpecialityRepository specialityRepository;

    @Autowired
    TimetableRepository timetableRepository;

    public   Page<Doctor> getAll(int page, int size)

{
    Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.ASC, "speciality","secondName","firstName","middleName"));

    return  doctorRepository.findAll(pageable);
}

    public Page<Doctor> getAllBySpeciality(Speciality speciality, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return doctorRepository.findAllBySpeciality(speciality, pageable);
    }


    public Doctor getOne(Long id) {
        return doctorRepository.findById(id).get();
    }

    public Long delete(Long id) {

        doctorRepository.deleteById(id);

        return id;
    }

    public Doctor addDoctor(Doctor doctor) throws EntityAlreadyExist {

        if (doctor.getId() != null) {

            throw new EntityAlreadyExist();

        }

        if (doctor.getSpeciality()==null)
        {
            throw new SpecialityNotFound();
        }
        else {
            doctorRepository.save(doctor);
        }

        return doctor;
    }

    public Doctor updateDoctor(Doctor doctor) {

        if (doctor.getId() == null) {

            throw new EntityNotExist();
        }

        doctorRepository.save(doctor);

        return doctor;
    }


}
