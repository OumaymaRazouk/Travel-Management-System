import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si un utilisateur est authentifié (ici, en vérifiant le localStorage pour le token)
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {
      // Redirige vers la page de login si l'utilisateur n'est pas authentifié
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
