
// reservation-modal.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../componentsAuth/auth.service';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent {
  reservationForm: FormGroup;
  loading = false;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {
    // Récupérer les données utilisateur dès l'initialisation
    this.user = this.authService.getCurrentUser();

    this.reservationForm = this.fb.group({
      name: [this.user?.name || '', [Validators.required]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', [Validators.required]]
    });
  }

  onConfirm() {
    if (this.reservationForm.valid) {
      this.loading = true;

      const user = this.authService.getCurrentUser();

      const reservationData = {
        userId: user?.id || 1, // Utiliser l'ID de l'utilisateur
        travelId: this.data.travel.id,
        userFields: {
          name: this.reservationForm.get('name')?.value || user?.fullName || '',
          email: this.reservationForm.get('email')?.value || user?.email || '',
          phone: this.reservationForm.get('phone')?.value || user?.phoneNumber || ''
        }
      };

      this.reservationService.createReservation(reservationData).subscribe({
        next: (response) => {
          this.dialogRef.close(true);
          this.router.navigate(['/reservations']);
        },
        error: (error) => {
          console.error('Erreur lors de la création de la réservation:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
    this.router.navigate(['/dashboard-travel-client']);
  }
}
