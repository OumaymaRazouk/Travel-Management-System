package org.springdemo.back_travelmanagement_front_office.repositories;

import org.springdemo.back_travelmanagement_front_office.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}

