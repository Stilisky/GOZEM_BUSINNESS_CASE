import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getPackage(deliveryId: string): Observable<Package> {
    return this.http.get<Package>(`http://127.0.0.1:5000/api/delivery/${deliveryId}`);
  }
}
