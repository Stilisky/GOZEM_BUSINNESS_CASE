import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import * as leaf from 'leaflet';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  searchValue: string | undefined;
  error: string | undefined;
  delivery: Delivery | undefined;
  private map: any;

  constructor(
    private deliveryService: DeliveryService
  ){}

  private initMap(lat: number, lng: number): void {
    this.map = leaf.map('map').setView([lat, lng], 13);
    leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
  }

  onSubmit(form: NgForm){
    if(this.searchValue){
      this.deliveryService.getDelivery(this.searchValue).subscribe(
        (response) => {
          this.error= "";
          this.delivery = response;

          this.initMap(response.package_id.to_location.lat, response.package_id.to_location.lng)
        },
        (err) => {
          this.error = "This delivery Id doesn't exist. Try again!"
        }
      )

    } else {
      this.error = "Delivery Id is required. Please try again!"
    }
  }

  ngOnInit(): void {

  }


}
