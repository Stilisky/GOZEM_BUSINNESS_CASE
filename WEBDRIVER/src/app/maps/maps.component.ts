import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Delivery } from '../models/delivery';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() deliveryData: any;
  currentLocation: any;
  map: any

  ngOnInit(): void {

    this.map = L.map('map').setView([this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)

    // L.marker([this.deliveryData?.package_id.to_location.lat, this.deliveryData?.package_id.to_location.lng]).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng], {}).addTo(this.map)
      .bindPopup('A Recipient address')
      .openPopup();

    this.getDeliveryPosition()

  }

  getDeliveryPosition(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation= {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.addCurrentPositionToMap()
      })
    }else {
      console.log("No geolocation");

    }
  }

  addCurrentPositionToMap(){
    L.marker([this.currentLocation.lat, this.currentLocation.lng], {}).addTo(this.map)
      .bindPopup('Driver Location')
      .openPopup();
  }
}
