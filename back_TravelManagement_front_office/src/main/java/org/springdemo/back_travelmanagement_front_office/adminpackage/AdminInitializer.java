package org.springdemo.back_travelmanagement_front_office.adminpackage;

import jakarta.annotation.PostConstruct;
import org.springdemo.back_travelmanagement_front_office.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springdemo.back_travelmanagement_front_office.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @PostConstruct
    public void init() {
        if (!userRepository.existsByEmail("admin@gmail.com")) {
            User admin = new User();
            admin.setFullName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setPhoneNumber("0000000000");
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }
    }
}