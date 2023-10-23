import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/package';
import { environment } from 'src/environements/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${environment.apiUrl}/api/package`);
  }

  createPackage(newPackage: Package): Observable<Package>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Package>(`${environment.apiUrl}/api/package/${newPackage.package_id}`, newPackage, httpOptions)
  }
}
