package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.repository.SpecialityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialityService {

    final private  SpecialityRepository specialityRepository;

    public SpecialityService(SpecialityRepository specialityRepository) {
        this.specialityRepository = specialityRepository;
    }


    public List<Speciality> getAll() {

        return specialityRepository.findAll();
    }


    public Optional<Speciality> getOne(Long id)
    {
        return specialityRepository.findById(id);
    }
}
