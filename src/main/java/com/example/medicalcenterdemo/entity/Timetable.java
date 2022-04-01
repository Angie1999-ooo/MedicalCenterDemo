package com.example.medicalcenterdemo.entity;

import com.example.medicalcenterdemo.enumaration.DayWeek;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Date;
import java.sql.Time;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Objects;

@Entity
//@Where(clause = "DELETED = 0")
@Getter
@Setter
@ToString
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="timetable")
public class Timetable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REFRESH)
    @JoinColumn(name = "doctor")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Doctor doctor;
    private Time startTime;
    private Time endTime;


    @NotNull
    private Integer dayWeek;


    public Timetable typeDoctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public Doctor getDoctor(){
        return doctor;
    }

    public void setDoctor(Doctor doctor){
        this.doctor=doctor;
    }

    public Timetable(Doctor doctor, Time startTime,Time endTime, Integer dayWeek) {
        this.doctor = doctor;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayWeek = dayWeek;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Timetable timetable = (Timetable) o;
        return Objects.equals(id, timetable.id) && Objects.equals(doctor, timetable.doctor) && Objects.equals(startTime, timetable.startTime)&& Objects.equals(endTime, timetable.endTime) && Objects.equals(dayWeek, timetable.dayWeek);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, doctor, startTime,endTime, dayWeek);
    }
}
