package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.exeptions.SpecialityNotFound;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {


    final private DoctorRepository doctorRepository;

    public DoctorService( DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;

    }
    @Cacheable("Doctor")
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

    public Doctor addDoctor(DoctorDTO doctorDTO) throws EntityAlreadyExist {

        Doctor doctor = new Doctor();
        doctor.setEducation(doctorDTO.getEducation());
        doctor.setSpeciality(doctorDTO.getSpeciality());
        doctor.setMiddleName(doctorDTO.getMiddleName());
        doctor.setSecondName(doctorDTO.getSecondName());
        doctor.setSecondName(doctorDTO.getFirstName());

        if (doctorDTO.getId() != null) {

            throw new EntityAlreadyExist();

        }

        if (doctorDTO.getSpeciality()==null)
        {
            throw new SpecialityNotFound();
        }
        else {
            doctorRepository.save(doctor);
        }

        return doctor;
    }

    public Doctor updateDoctor(Doctor doctorDTO) {

        if (doctorDTO.getId() == null) {

            throw new EntityNotExist();
        }

        doctorRepository.save(doctorDTO);

        return doctorDTO;
    }


}
