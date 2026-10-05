package org.springdemo.back_travelmanagement_front_office.dto;



import org.springdemo.back_travelmanagement_front_office.entities.Travel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter

public class TravelDTO {
    private Long id;
    private String destination;
    private String dateDepart;
    private String dateRetour;
    private Double prix;
    private Integer nombrePlaces;
    private String description;
    private String imageUrl;
    private Long promotion;

    public TravelDTO(Travel travel) {
        this.id = travel.getIdVoyage();
        this.destination = travel.getDestination();
        this.dateDepart = String.valueOf(travel.getDateDepart());
        this.dateRetour = String.valueOf(travel.getDateRetour());
        this.prix = travel.getPrix();
        this.nombrePlaces = travel.getNombrePlaces();
        this.description = travel.getDescription();
        this.imageUrl = (travel.getImageUrl() == null || "null".equals(travel.getImageUrl())) ? null : travel.getImageUrl();
        this.promotion = travel.getPromotion() != null ? travel.getPromotion().getId() : null;
    }

}
