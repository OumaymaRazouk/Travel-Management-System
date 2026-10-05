package org.springdemo.back_travelmanagement_front_office.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springdemo.back_travelmanagement_front_office.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
