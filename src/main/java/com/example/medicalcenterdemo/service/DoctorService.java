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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    Pageable pageable = PageRequest.of(page, size);
    Page<Doctor> personList = doctorRepository.findAll(pageable);

    List<Doctor> result = personList.stream()
            .sorted(Comparator.comparing(Doctor::getSecondName))
            .collect(Collectors.groupingBy(Doctor::getSpeciality, LinkedHashMap::new,Collectors. toList()))
            .values().stream()
            .flatMap(Collection::stream)
            .collect(Collectors. toList());

    return  new PageImpl<Doctor>(result,pageable, doctorRepository.count());
}



    public Page<Doctor> getAllBySpeciality(Speciality speciality, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return doctorRepository.findAllBySpeciality(speciality, pageable);
    }


    public Doctor getOne(Long id) {
        return doctorRepository.findById(id).get();
    }


    public Page<Doctor> getByName(String fullName, int page,int limit) {

        String[] name= fullName.split(" ");
        Pageable pageable = PageRequest.of(page, limit);
        List<Doctor> result= doctorRepository.findBySecondName(name[0]);
        List<Doctor> fill=new ArrayList<>();

        switch(name.length) {
            case 1:
                fill = doctorRepository.findBySecondName(name[0]);
                break;
            case 2:
                for (Doctor doctor : result) {
                    if (doctor.getFirstName().equals(name[1])) {
                        fill.add(doctor);
                    }
                }
                break;
            case 3:
                for (Doctor doctor : result) {
                    if (doctor.getFirstName().equals(name[1]) && doctor.getMiddleName().equals(name[2])) {
                        fill.add(doctor);
                    }
                }
        }

        int startOfPage = pageable.getPageNumber() * pageable.getPageSize();

        if (startOfPage > fill.size()) {

            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }

        int endOfPage = Math.min(startOfPage + pageable.getPageSize(), fill.size());

        return  new PageImpl<Doctor>(fill.subList(startOfPage, endOfPage), pageable, fill.size());

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
