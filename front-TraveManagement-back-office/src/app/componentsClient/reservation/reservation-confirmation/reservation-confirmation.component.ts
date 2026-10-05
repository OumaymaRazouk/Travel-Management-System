// src/app/componentsClient/reservation/reservation-confirmation/reservation-confirmation.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reservation-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirmation-container">
      <h2>Confirmation de réservation</h2>
      <div class="confirmation-content">
        <mat-icon class="confirmation-icon">check_circle</mat-icon>
        <p>Votre réservation a été confirmée avec succès !</p>
        <p>Numéro de réservation: {{ data.reservationId }}</p>
        <p>Destination: {{ data.destination }}</p>
        <p>Date de voyage: {{ data.date }}</p>
      </div>
      <div class="button-container">
        <button mat-raised-button color="primary" (click)="onClose()">
          <mat-icon>arrow_back</mat-icon>
          Retour à la liste des voyages
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirmation-container {
      padding: 20px;
      text-align: center;
    }

    .confirmation-content {
      margin: 20px 0;
    }

    .confirmation-icon {
      font-size: 48px;
      color: #4caf50;
      margin-bottom: 20px;
    }

    .button-container {
      margin-top: 20px;
    }

    button.mat-raised-button {
      min-width: 200px;
    }

    mat-icon {
      margin-right: 8px;
    }
  `]
})
export class ReservationConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReservationConfirmationComponent>
  ) {}

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }
}
