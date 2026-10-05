import { Component, OnInit } from '@angular/core';
import {RouterLink, ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {DatePipe, NgIf} from '@angular/common';

import { TravelService } from '../../../services/travel.service';
import { Travel } from '../../../componentsAdmin/models/travel.model';

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive,
    DatePipe,
  ],
  templateUrl: './travel-detail-client.component.html',
  styleUrls: ['./travel-detail-client.component.css']
})
export class TravelDetailClientComponent implements OnInit {
  travel?: Travel;
  id!: number;  // ✅ on déclare l'id ici

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];  // ✅ on récupère l'ID une fois pour toutes
    this.travelService.getTravelById(this.id).subscribe((data) => {
      this.travel = data;
    });
  }

  reserverTravel(): void {
    this.router.navigate(['travels/reserver-client', this.id]);
  }
}
