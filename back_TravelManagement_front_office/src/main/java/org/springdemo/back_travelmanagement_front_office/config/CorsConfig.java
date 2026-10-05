package org.springdemo.back_travelmanagement_front_office.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Autoriser les requêtes CORS de l'application Angular qui fonctionne sur http://localhost:4200
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200") // URL de ton application Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS"); // Méthodes HTTP autorisées
    }
}


