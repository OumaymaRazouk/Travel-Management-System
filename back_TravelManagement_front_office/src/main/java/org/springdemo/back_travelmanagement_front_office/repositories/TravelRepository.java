package org.springdemo.back_travelmanagement_front_office.repositories;

import org.springdemo.back_travelmanagement_front_office.entities.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelRepository extends JpaRepository<Travel, Long> {
}
