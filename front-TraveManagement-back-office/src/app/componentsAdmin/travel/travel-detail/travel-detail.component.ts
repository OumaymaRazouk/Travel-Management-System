import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';

import { TravelService } from '../../../services/travel.service';
import { Travel } from '../../models/travel.model';

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe,
  ],
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.css']
})
export class TravelDetailComponent implements OnInit {
  travel?: Travel;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.loadTravelDetails();
    }
  }

  loadTravelDetails(): void {
    this.travelService.getTravelById(this.id).subscribe({
      next: (data) => {
        this.travel = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du voyage:', error);
        this.router.navigate(['/dashboard-travel']);
      }
    });
  }

  deleteTravel(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      this.travelService.deleteTravel(this.id).subscribe({
        next: () => {
          this.router.navigate(['/dashboard-travel']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du voyage:', error);
        }
      });
    }
  }

  editTravel(): void {
    this.router.navigate(['/travels/edit', this.id]);
  }
}
