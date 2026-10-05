import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Travel } from '../componentsAdmin/models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = 'http://localhost:8080/api/travels';
  private travels: Travel[] = [];

  constructor(private http: HttpClient) { }

  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.apiUrl).pipe(
      tap(travels => this.travels = travels)
    );
  }

  addTravel(travel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, travel);
  }

  updateTravel(id: number, formData: FormData): Observable<Travel> {
    return this.http.put<Travel>(`${this.apiUrl}/${id}/with-image`, formData);
  }

  deleteTravel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Update the local list after successful deletion
        this.travels = this.travels.filter(travel => travel.idVoyage !== id);
        // Fetch the updated list from the server
        this.getTravels().subscribe();
      })
    );
  }

  getTravelById(id: number): Observable<Travel> {
    return this.http.get<Travel>(`${this.apiUrl}/${id}`);
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' });
  }
}
