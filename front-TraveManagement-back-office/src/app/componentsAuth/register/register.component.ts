import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  submit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8080/api/auth/register', this.registerForm.value)
        .subscribe({
          next: () => {
            alert('Inscription réussie ! Connecte-toi maintenant 😎');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            const message = err.error?.message || JSON.stringify(err.error) || 'Erreur lors de l’inscription';
            alert(message);
          }
        });
    }
  }
}

