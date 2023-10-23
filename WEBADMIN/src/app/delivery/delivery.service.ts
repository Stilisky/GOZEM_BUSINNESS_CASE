import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';
import { environment } from 'src/environements/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${environment.apiUrl}/api/delivery`)
  }

  createDelivery(newDelivery: Delivery): Observable<Delivery> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Delivery>(`${environment.apiUrl}/api/delivery/${newDelivery.delivery_id}`, newDelivery, httpOptions)

  }
}
