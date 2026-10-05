import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    // Vérification que l'on est dans le navigateur
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Ajouter un délai avant d'appliquer l'animation pour tester
      setTimeout(() => {
        const element = document.querySelector('.text-center');
        if (element) {
          element.classList.add('animate__fadeIn'); // Appliquer l'animation après le délai
        }
      }, 200); // 200ms de délai
    }
  }

}
