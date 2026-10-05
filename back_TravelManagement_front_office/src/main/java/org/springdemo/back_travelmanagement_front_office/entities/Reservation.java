package org.springdemo.back_travelmanagement_front_office.entities;

import jakarta.persistence.*;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "travel_id")
    private Travel travel;

    // Constructeurs
    public Reservation() {}

    public Reservation(User user, Travel travel) {
        this.user = user;
        this.travel = travel;
    }

    // Getters et Setters
    public Long getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Travel getTravel() { return travel; }
    public void setTravel(Travel travel) { this.travel = travel; }
}

