package org.springdemo.back_travelmanagement_front_office.controllers;


import jakarta.annotation.PostConstruct;
import org.springdemo.back_travelmanagement_front_office.dto.TravelDTO;
import org.springdemo.back_travelmanagement_front_office.entities.Travel;
import org.springdemo.back_travelmanagement_front_office.services.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/travels")
@CrossOrigin(origins = "http://localhost:4200") // pour autoriser Angular Front Office
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping
    public List<Travel> getAllTravels() {
        return travelService.getAllTravels();
    }

    @GetMapping("/{id}")
    public TravelDTO getTravelById(@PathVariable Long id) {
        Travel travel = travelService.getTravelById(id)
                .orElseThrow(() -> new RuntimeException("Travel not found"));
        return new TravelDTO(travel);
    }


    @PostMapping
    public Travel createTravel(@RequestBody Travel travel) {
        return travelService.createTravel(travel);
    }

    @PutMapping("/{id}")
    public Travel updateTravel(@PathVariable Long id, @RequestBody Travel travelDetails) {
        return travelService.updateTravel(id, travelDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteTravel(@PathVariable Long id) {
        travelService.deleteTravel(id);
    }

    @PostMapping("/with-image")
    public ResponseEntity<Travel> createTravelWithImage(
            @RequestParam("destination") String destination,
            @RequestParam("dateDepart") String dateDepart,
            @RequestParam("dateRetour") String dateRetour,
            @RequestParam("prix") double prix,
            @RequestParam("nombrePlaces") int nombrePlaces,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", required = false) String description

    ) {
        try {
            // Enregistrement du fichier dans le dossier "uploads"
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads");
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, file.getBytes());

            // Création de l'objet Travel
            Travel travel = new Travel();
            travel.setDestination(destination);
            travel.setDateDepart(new Date(java.sql.Date.valueOf(dateDepart).getTime()));
            travel.setDateRetour(new Date(java.sql.Date.valueOf(dateRetour).getTime()));
            travel.setPrix(prix);
            travel.setNombrePlaces(nombrePlaces);
            travel.setDescription(description);
            travel.setImageUrl("http://localhost:8080/uploads/" + fileName);


            Travel savedTravel = travelService.createTravel(travel);
            return new ResponseEntity<>(savedTravel, HttpStatus.CREATED);

        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}/with-image")
    public ResponseEntity<Travel> updateTravelWithImage(
            @PathVariable Long id,
            @RequestParam("destination") String destination,
            @RequestParam("dateDepart") String dateDepart,
            @RequestParam("dateRetour") String dateRetour,
            @RequestParam("prix") double prix,
            @RequestParam("nombrePlaces") int nombrePlaces,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "description", required = false) String description
    ) {
        try {
            Travel existingTravel = travelService.getTravelById(id)
                    .orElseThrow(() -> new RuntimeException("Travel not found"));

            existingTravel.setDestination(destination);
            existingTravel.setDateDepart(new Date(java.sql.Date.valueOf(dateDepart).getTime()));
            existingTravel.setDateRetour(new Date(java.sql.Date.valueOf(dateRetour).getTime()));
            existingTravel.setPrix(prix);
            existingTravel.setNombrePlaces(nombrePlaces);
            existingTravel.setDescription(description);

            if (file != null && !file.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(fileName);
                Files.write(filePath, file.getBytes());
                existingTravel.setImageUrl("http://localhost:8080/uploads/" + fileName);
            }

            Travel updatedTravel = travelService.updateTravel(id, existingTravel);
            return new ResponseEntity<>(updatedTravel, HttpStatus.OK);

        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/uploads/{filename:.+}")
    @ResponseBody
    public ResponseEntity<UrlResource> getImage(@PathVariable String filename) throws IOException {
        Path imagePath = Paths.get(uploadDirectory).resolve(filename);
        UrlResource resource = new UrlResource(imagePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(imagePath));
            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostConstruct
    public void init() {
        File uploadDir = new File(uploadDirectory);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
            System.out.println("Dossier uploads créé à : " + uploadDir.getAbsolutePath());
        }
    }


    public static String uploadDirectory = System.getProperty("user.dir") + "/uploads";

}

