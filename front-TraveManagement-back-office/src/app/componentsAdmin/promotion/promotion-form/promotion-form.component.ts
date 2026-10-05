import { Component, OnInit } from '@angular/core';
import { Promotion, PromotionService } from '../../../services/promotion.service';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
    imports: [
        FormsModule,
        RouterLink,
        RouterLinkActive,
    ],
  standalone: true
})
export class PromotionFormComponent implements OnInit {

  promotion: Promotion = {
    nom: '',
    pourcentage: 0,
    dateFin: ''
  };

  id?: number;

  constructor(private service: PromotionService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.service.get(this.id).subscribe(data => this.promotion = data);
    }
  }

  savePromotion() {
    if (this.id) {
      this.service.update(this.id, this.promotion).subscribe(() => {
        this.router.navigate(['/promotion-list']); // Rediriger vers la liste après update
      });
    } else {
      this.service.create(this.promotion).subscribe(() => {
        this.router.navigate(['/promotion-list']); // Rediriger vers la liste après ajout
      });
    }
  }
}
