import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDelivery(deliveryId: string): Observable<Delivery> {
    return this.http.get<Delivery>(`http://127.0.0.1:5000/api/delivery/${deliveryId}`);
  }
}
