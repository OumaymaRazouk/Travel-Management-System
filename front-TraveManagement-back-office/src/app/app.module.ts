import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {PromotionService} from './services/promotion.service'

// Importation des composants
import { DashboardTravelComponent } from './components/travel/dashboard-travel/dashboard-travel.component';
import { TravelAddComponent } from './components/travel/travel-add/travel-add.component';
import { TravelEditComponent } from './components/travel/travel-edit/travel-edit.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,  // Assurez-vous que vous n'avez pas de versions obsolètes ou incorrectes de HttpClientModule
    RouterModule.forRoot([]),
    DashboardTravelComponent,
    TravelAddComponent,
    TravelEditComponent,
  ],
  providers: [PromotionService],  // Modifie cela si tu veux que ton composant principal soit différent
})
export class AppModule { }

