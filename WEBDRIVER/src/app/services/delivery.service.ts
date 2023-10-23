import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';
import { environment } from 'src/environements/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  delivId: any ;

  setDeliveryId(deliv: any){
    this.delivId = deliv
    console.log(this.delivId);

  }

  getDelivData(){
    console.log(this.delivId);
    return this.getDelivery(this.delivId)
  }

  constructor(private http: HttpClient) { }

  getDelivery(deliveryId: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${environment.apiUrl}/api/delivery/${deliveryId}`);
  }
}
