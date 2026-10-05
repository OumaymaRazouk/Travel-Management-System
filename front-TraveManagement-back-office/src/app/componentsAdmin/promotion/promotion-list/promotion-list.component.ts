import { Component, OnInit } from '@angular/core';
import { Promotion, PromotionService } from '../../../services/promotion.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
    imports: [
        RouterLink,
        NgForOf,
        DatePipe,
        RouterLinkActive
    ],
  standalone: true
})
export class PromotionListComponent implements OnInit {

  promotions: Promotion[] = [];

  constructor(private service: PromotionService, private router: Router) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions() {
    this.service.getAll().subscribe(data => this.promotions = data);
  }

  deletePromotion(id: number | undefined) {
    if (confirm('Es-tu sûr de vouloir supprimer cette promotion ?')) {
      this.service.delete(id).subscribe(() => this.loadPromotions());
    }
  }
}
