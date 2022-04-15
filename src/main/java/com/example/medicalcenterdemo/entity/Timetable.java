package com.example.medicalcenterdemo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.util.Objects;



@Entity
//@Where(clause = "DELETED = 0")
@Data
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="timetable")
public class Timetable implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    @NotNull
    @JsonIgnore
    private Doctor doctor;
    private Time startTime;
    private Time endTime;
    @NotNull
    private Integer dayWeek;


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
