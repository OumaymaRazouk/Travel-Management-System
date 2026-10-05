import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TravelService } from '../../../services/travel.service';
import { Travel } from '../../models/travel.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-travel-add',
  templateUrl: './travel-add.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./travel-add.component.css']
})
export class TravelAddComponent implements OnInit {

  newTravel: Travel = new Travel();
  selectedFile: File | null = null;
  errorMessage: string = '';
  imagePreviewUrl: string | ArrayBuffer | null = null;
  promotions: any[] = [];

  constructor(
    private travelService: TravelService,
    private promotionService: PromotionService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPromotions();
  }

  loadPromotions() {
    this.promotionService.getAll().subscribe(
      data => this.promotions = data,
      error => console.error('Erreur lors du chargement des promotions:', error)
    );
  }

  saveTravel() {
    if (new Date(this.newTravel.dateRetour) <= new Date(this.newTravel.dateDepart)) {
      this.errorMessage = 'La date de retour doit être après la date de départ.';
      return;
    }

    const formData = new FormData();
    formData.append("destination", this.newTravel.destination);
    formData.append("dateDepart", this.newTravel.dateDepart);
    formData.append("dateRetour", this.newTravel.dateRetour);
    formData.append("prix", this.newTravel.prix.toString());
    formData.append("nombrePlaces", this.newTravel.nombrePlaces.toString());
    formData.append("description", this.newTravel.description.toString());
    
    if (this.newTravel.promotion) {
      formData.append("promotion", this.newTravel.promotion);
    }

    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }

    if (this.newTravel.idVoyage) {
      this.http.put(`http://localhost:8080/api/travels/${this.newTravel.idVoyage}/with-image`, formData)
        .subscribe({
          next: () => this.router.navigate(['/dashboard-travel']),
          error: () => this.errorMessage = "Erreur lors de la mise à jour"
        });
    } else {
      this.http.post(`http://localhost:8080/api/travels/with-image`, formData)
        .subscribe({
          next: () => this.router.navigate(['/dashboard-travel']),
          error: () => this.errorMessage = "Erreur lors de l'ajout"
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
        this.newTravel.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
