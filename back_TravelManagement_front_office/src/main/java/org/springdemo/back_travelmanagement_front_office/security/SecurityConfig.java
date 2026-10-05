package org.springdemo.back_travelmanagement_front_office.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(withDefaults())  // Active la configuration CORS par défaut
                .csrf(csrf -> csrf.disable())  // Désactive la protection CSRF
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/**").permitAll()  // Permet l'accès sans authentification à ces routes d'authentification
                        .requestMatchers("/", "/home", "/public/**").permitAll()  // Permet l'accès sans authentification à ces pages publiques
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/uploads/**").permitAll()  // <== autoriser l'accès aux images uploadées
                        .anyRequest().authenticated()  // Authentifie toutes les autres pages
                )
                .formLogin(withDefaults())  // Utilise le formulaire de connexion par défaut
                .logout(logout -> logout.permitAll())  // Permet à tout le monde de se déconnecter
                .exceptionHandling(e -> e.authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");  // Gère les erreurs d'authentification
                }))
                .build();
    }
}
