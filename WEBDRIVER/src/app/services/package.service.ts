import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/package';
import { environment } from 'src/environements/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getPackage(deliveryId: string): Observable<Package> {
    return this.http.get<Package>(`${environment.apiUrl}/api/delivery/${deliveryId}`);
  }
}
