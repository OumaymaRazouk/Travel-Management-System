package org.springdemo.back_travelmanagement_front_office.controllers;

import org.springdemo.back_travelmanagement_front_office.dto.LoginRequest;
import org.springdemo.back_travelmanagement_front_office.dto.RegisterRequest;
import org.springdemo.back_travelmanagement_front_office.entities.User;
import org.springdemo.back_travelmanagement_front_office.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            // Si l'email existe déjà, tu peux choisir d'ignorer cette logique ou de gérer autrement,
            // par exemple, en lançant une exception (mais sans réponse HTTP ici).
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole("CLIENT");

        userRepo.save(user);
        // Aucune réponse envoyée ici, l'action est effectuée en coulisses
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        User user = userRepo.findByEmail(login.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!encoder.matches(login.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }
        return ResponseEntity.ok(user);
    }
}
