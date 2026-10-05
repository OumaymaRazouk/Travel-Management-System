import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../services/travel.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Travel } from '../../../componentsAdmin/models/travel.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-travel-client',
  templateUrl: './dashboard-travel-client.component.html',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  standalone: true,
  styleUrls: ['./dashboard-travel-client.component.css']
})
export class DashboardTravelClientComponent implements OnInit {
  travels: Travel[] = [];
  loading: boolean = true;

  constructor(private travelService: TravelService, private router: Router) {
  }

  ngOnInit() {
    this.loadTravels();
  }

  loadTravels() {
    this.loading = true;
    this.travelService.getTravels().subscribe({
      next: (data) => {
        this.travels = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading travels:', error);
        this.loading = false;
      }
    });
  }

  navigateToDetail(id: number | undefined) {
    if (id) {
      this.router.navigate(['travels/detail-client/', id]);
    }
  }
}
