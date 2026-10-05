package org.springdemo.back_travelmanagement_front_office.services;


import org.springdemo.back_travelmanagement_front_office.entities.Travel;
import org.springdemo.back_travelmanagement_front_office.repositories.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;
    private Travel travel;

    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    public Optional<Travel> getTravelById(Long id) {
        return travelRepository.findById(id);
    }

    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public Travel updateTravel(Long id, Travel travelDetails) {
        Travel travel = travelRepository.findById(id).orElseThrow(() -> new RuntimeException("Travel not found"));
        travel.setDestination(travelDetails.getDestination());
        travel.setDateDepart(travelDetails.getDateDepart());
        travel.setDateRetour(travelDetails.getDateRetour());
        travel.setPrix(travelDetails.getPrix());
        travel.setNombrePlaces(travelDetails.getNombrePlaces());
        travel.setDescription(travelDetails.getDescription());
        travel.setImageUrl(travelDetails.getImageUrl());

        return travelRepository.save(travel);
    }

    public void deleteTravel(Long id) {
        travelRepository.deleteById(id);
    }
}
