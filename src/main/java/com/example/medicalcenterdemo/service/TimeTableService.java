package com.example.medicalcenterdemo.service;


import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Timetable;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimeTableService {

    final private  TimetableRepository timetableRepository;

    public TimeTableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public List<Timetable> addTimetable(List<Timetable> timetable) {

        for (Timetable time : timetable) {
            if (time.getId() != null) {

                throw new EntityAlreadyExist();
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



    public Optional<Timetable> getOne(Long id) {
       return timetableRepository.findById(id);
    }

    public Long delete(Long id) {
        timetableRepository.deleteById(id);
        return id;

    }
}
