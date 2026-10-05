import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Promotion {
  id?: number;
  nom: string;
  pourcentage: number;
  dateFin: string;
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private baseUrl = 'http://localhost:8080/api/promotions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.baseUrl);
  }

  get(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.baseUrl}/${id}`);
  }

  create(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.baseUrl, promotion);
  }

  update(id: number, promotion: Promotion): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.baseUrl}/${id}`, promotion);
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
