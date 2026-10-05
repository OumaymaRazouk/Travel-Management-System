import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Initialiser loginForm dans le constructeur
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:8080/api/auth/login', this.loginForm.value)
        .subscribe({
          next: (res) => {
            // Stocker les infos localement (sans token)
            localStorage.setItem('email', res.email);
            localStorage.setItem('role', res.role);
            // Stocker les données utilisateur complètes
            localStorage.setItem('user', JSON.stringify(res));

            alert('Connexion réussie');

            // Redirection selon rôle
            if (res.role === 'ADMIN') {
              this.router.navigate(['/dashboard-travel']);
            } else {
              this.router.navigate(['/dashboard-travel-client']);
            }
          },
          error: (err) => {
            alert(err.error || 'Identifiants incorrects');
          }
        });
    }
  }
}


