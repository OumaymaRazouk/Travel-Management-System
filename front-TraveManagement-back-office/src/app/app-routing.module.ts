import { Routes } from '@angular/router';
import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'

import { DashboardTravelComponent } from './componentsAdmin/travel/dashboard-travel/dashboard-travel.component';
import { TravelAddComponent } from './componentsAdmin/travel/travel-add/travel-add.component';
import { TravelEditComponent } from './componentsAdmin/travel/travel-edit/travel-edit.component';
import {TravelDetailComponent} from './componentsAdmin/travel/travel-detail/travel-detail.component';

import { PromotionListComponent } from './componentsAdmin/promotion/promotion-list/promotion-list.component';
import { PromotionFormComponent } from './componentsAdmin/promotion/promotion-form/promotion-form.component';

import {HomeComponent} from './componentsAdmin/home/home.component';

import {DashboardTravelClientComponent} from './componentsClient/travel/dashboard-travel-client/dashboard-travel-client.component';
import {TravelDetailClientComponent} from './componentsClient/travel/travel-detail-client/travel-detail-client.component';
import {ReserverTravelClientComponent} from './componentsClient/travel/reserver-travel-client/reserver-travel-client.component';


const routes: Routes = [
  // Routes pour les voyages
  { path: 'dashboard-travel', component: DashboardTravelComponent },
  { path: 'travels/add', component: TravelAddComponent },
  { path: 'travels/edit/:id', component: TravelEditComponent },
  { path: 'travels/detail/:id', component: TravelDetailComponent },

  { path: 'dashboard-travel-client', component: DashboardTravelClientComponent },
  { path: 'travels/detail-client/:id', component: TravelDetailClientComponent },
  { path: 'travels/reserver-client/:id', component: ReserverTravelClientComponent },


  { path: 'promotion-list', component: PromotionListComponent },
  { path: 'promotions/add', component: PromotionFormComponent },
  { path: 'promotions/edit/:id', component: PromotionFormComponent },
  { path: 'home', component: HomeComponent },

  // Routes pour les promotions


  // Redirection par défaut vers les voyages
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
