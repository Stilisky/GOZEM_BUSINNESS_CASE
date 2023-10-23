import { Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() deliveryData: any;
  currentLocation: any;
  map: any;
  currentMaker: any;
  trajet: any;

  constructor(
  ){}

  ngOnInit(): void {

    this.map = L.map('map').setView([this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.deliveryData.package_id.from_location.lat, this.deliveryData.package_id.from_location.lng], {}).addTo(this.map)
      .bindPopup('A Sender address')
      .openPopup();

    L.marker([this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng], {}).addTo(this.map)
      .bindPopup('A Recipient address')
      .openPopup();

    L.marker([this.deliveryData.location.lat, this.deliveryData.location.lng]).addTo(this.map)
      .bindPopup('Driver Location')
      .openPopup();

    L.polyline([
      [this.deliveryData.location.lat, this.deliveryData.location.lng],
      [this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng]
    ], {color: 'green'}).addTo(this.map);

    this.map.fitBounds(this.trajet.getBounds());

  }
}
