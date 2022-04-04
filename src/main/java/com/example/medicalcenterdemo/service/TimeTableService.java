package com.example.medicalcenterdemo.service;


import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.entity.Timetable;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class TimeTableService {
    @Autowired
    TimetableRepository timetableRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    private DoctorService doctorService;


    public  Page<Timetable> getAll(int page, int size) {

        Page<Doctor> personList = doctorService.getAll(page, size);
        Pageable pageable = PageRequest.of(page, size);
        List<Timetable> timetables = new ArrayList<>();

        for (Doctor doctor : personList) {

            timetables.addAll(timetableRepository.findByDoctor(doctor));
        }


        return new PageImpl<Timetable>(timetables,pageable, doctorRepository.count());
    }

    public List<Timetable> addTimetable(List<Timetable> timetable) {

        for (Timetable time : timetable) {
            if (time.getId() != null) {

                throw new EntityAlreadyExist();
            }
            if (time.getDoctor() == null) {
                Optional<Doctor> doctor= doctorRepository.findById(doctorRepository.count());
                time.setDoctor(doctor.get());
            }
        }

        return  timetableRepository.saveAll(timetable);
    }

    public List<Timetable> updateTimetable(List<Timetable> timetable) {

        for(Timetable result :timetable ) {
            timetableRepository.findById(result.getId()).orElseThrow(RuntimeException::new);

        }

        return  timetableRepository.saveAll(timetable);
    }


    public List<Timetable> getByDoctor(Doctor doctor) {
        return timetableRepository.findByDoctor(doctor);
    }

    public List<Timetable> getAllBySpeciality(Speciality speciality, int page, int size) {

        Page<Doctor> personList = doctorService.getAllBySpeciality(speciality, page, size);
        List<Timetable> timetables = new ArrayList<>();
        
        for (Doctor doctor : personList) {

            timetables.addAll(timetableRepository.findByDoctor(doctor));
        }


        return timetables;
    }

    public List<Timetable> getByName(String fullName, int page, int size) {

        Page<Doctor> personList = doctorService.getByName(fullName, page, size);
        List<Timetable> timetables = new ArrayList<>();

        for (Doctor doctor : personList) {

            timetables.addAll(timetableRepository.findByDoctor(doctor));
        }
        return timetables;
    }



    public Optional<Timetable> getOne(Long id) {
       return timetableRepository.findById(id);
    }

    public Long delete(Long id) {
        timetableRepository.deleteById(id);
        return id;

    }
}
