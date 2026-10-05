package org.springdemo.back_travelmanagement_front_office.controllers;
import org.springdemo.back_travelmanagement_front_office.dto.ReservationRequestDto;
import org.springdemo.back_travelmanagement_front_office.entities.Reservation;
import org.springdemo.back_travelmanagement_front_office.services.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationRequestDto dto) {
        return reservationService.createReservation(dto.getUserId(), dto.getTravelId());
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}

