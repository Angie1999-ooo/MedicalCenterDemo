package com.example.medicalcenterdemo.entity;


import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Entity
@Data
@EnableAutoConfiguration
@AllArgsConstructor
@NoArgsConstructor
@Table(name="statistic")


public class Statistic implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "speciality")
    @NotNull
    private Speciality speciality;
    private LocalDate startDate;
    private LocalDate endDate;

}
