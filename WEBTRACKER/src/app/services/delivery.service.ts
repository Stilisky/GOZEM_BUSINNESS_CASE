import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDelivery(deliveryId: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${environment.apiUrl}/api/delivery/${deliveryId}`);
  }
}
