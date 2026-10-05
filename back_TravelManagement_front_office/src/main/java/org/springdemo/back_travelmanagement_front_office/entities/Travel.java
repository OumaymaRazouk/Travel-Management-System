package org.springdemo.back_travelmanagement_front_office.entities;



import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Travel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVoyage;

    private String destination;

    @Temporal(TemporalType.DATE)
    private Date dateDepart;

    @Temporal(TemporalType.DATE)
    private Date dateRetour;

    private double prix;

    private int nombrePlaces;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "promotion_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Promotion promotion;


    public void setImageUrl(String imageUrl) {
        this.imageUrl = (imageUrl == null || "null".equals(imageUrl)) ? null : imageUrl;
    }

}
