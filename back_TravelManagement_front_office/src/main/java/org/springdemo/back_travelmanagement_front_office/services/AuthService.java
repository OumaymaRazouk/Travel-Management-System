package org.springdemo.back_travelmanagement_front_office.services;

import org.springdemo.back_travelmanagement_front_office.dto.LoginRequest;
import org.springdemo.back_travelmanagement_front_office.dto.RegisterRequest;
import org.springdemo.back_travelmanagement_front_office.enums.Role;
import org.springdemo.back_travelmanagement_front_office.entities.User;
import org.springdemo.back_travelmanagement_front_office.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerClient(RegisterRequest req) {
        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(String.valueOf(Role.CLIENT)); // Par défaut, le rôle est CLIENT
        return userRepository.save(user);
    }

    public Optional<User> login(LoginRequest req) {
        return userRepository.findByEmail(req.getEmail())
                .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()));
    }
}
