package org.springdemo.back_travelmanagement_front_office.services;
import org.springdemo.back_travelmanagement_front_office.entities.Reservation;
import org.springdemo.back_travelmanagement_front_office.entities.Travel;
import org.springdemo.back_travelmanagement_front_office.entities.User;
import org.springdemo.back_travelmanagement_front_office.repositories.ReservationRepository;
import org.springdemo.back_travelmanagement_front_office.repositories.TravelRepository;
import org.springdemo.back_travelmanagement_front_office.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final TravelRepository travelRepository;

    public ReservationService(ReservationRepository reservationRepository,
                              UserRepository userRepository,
                              TravelRepository travelRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.travelRepository = travelRepository;
    }

    public Reservation createReservation(Long userId, Long travelId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Travel> travelOpt = travelRepository.findById(travelId);

        if (userOpt.isPresent() && travelOpt.isPresent()) {
            Reservation reservation = new Reservation(userOpt.get(), travelOpt.get());
            return reservationRepository.save(reservation);
        } else {
            throw new RuntimeException("Utilisateur ou voyage non trouvé");
        }
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}

