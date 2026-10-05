package org.springdemo.back_travelmanagement_front_office.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private Double pourcentage;

    private LocalDate dateFin;

    @OneToMany(mappedBy = "promotion")
    private List<Travel> travels;

 }