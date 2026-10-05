import { Component, OnInit, OnDestroy } from '@angular/core';
import { TravelService } from '../../../services/travel.service';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Travel } from '../../models/travel.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-travel',
  templateUrl: './dashboard-travel.component.html',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  standalone: true,
  styleUrls: ['./dashboard-travel.component.css']
})
export class DashboardTravelComponent implements OnInit, OnDestroy {
  travels: Travel[] = [];
  loading: boolean = true;
  private routerSubscription: Subscription;

  constructor(private travelService: TravelService, private router: Router) {
    // Subscribe to router events to refresh the list when navigating back to dashboard
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url === '/dashboard-travel') {
        this.loadTravels();
      }
    });
  }

  ngOnInit() {
    this.loadTravels();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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
      this.router.navigate(['/travels/detail', id]);
    }
  }
}
