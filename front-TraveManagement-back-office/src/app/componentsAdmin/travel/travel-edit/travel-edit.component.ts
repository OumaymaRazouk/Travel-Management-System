import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TravelService } from '../../../services/travel.service';
import { Travel } from '../../models/travel.model';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-travel-edit',
  templateUrl: './travel-edit.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true,
  styleUrls: ['./travel-edit.component.css']
})
export class TravelEditComponent implements OnInit {

  travel: Travel = new Travel();
  id!: number;
  errorMessage: string = '';
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  promotions: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService,
    private promotionService: PromotionService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPromotions();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.travelService.getTravelById(this.id).subscribe((data: Travel) => {
      this.travel = data;
      if (this.travel.imageUrl) {
        this.imagePreviewUrl = this.travel.imageUrl;
      }
    });
  }


  loadPromotions() {
    this.promotionService.getAll().subscribe(
      data => this.promotions = data,
      error => console.error('Erreur lors du chargement des promotions:', error)
    );
  }

  updateTravel() {
    if (new Date(this.travel.dateRetour) <= new Date(this.travel.dateDepart)) {
      this.errorMessage = 'La date de retour doit être après la date de départ.';
      return;
    }

    const formData = new FormData();
    formData.append("destination", this.travel.destination);
    formData.append("dateDepart", this.travel.dateDepart);
    formData.append("dateRetour", this.travel.dateRetour);
    formData.append("prix", this.travel.prix.toString());
    formData.append("nombrePlaces", this.travel.nombrePlaces.toString());
    formData.append("description", this.travel.description.toString());

    if (this.travel.promotion) {
      formData.append("promotion", this.travel.promotion);
    }

    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }

    this.http.put(`http://localhost:8080/api/travels/${this.id}/with-image`, formData)
      .subscribe({
        next: () => this.router.navigate(['/dashboard-travel']),
        error: () => this.errorMessage = "Erreur lors de la mise à jour"
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
        this.travel.imageUrl = reader.result as string; // Pour afficher avec *ngIf
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


}

