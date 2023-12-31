import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() deliveryData: any;
  currentLocation: any;
  map: any;
  currentMaker: any;
  trajet: any;

  constructor(
    private webSocket: WebsocketService
  ){}

  ngOnInit(): void {

    this.map = L.map('map').setView([this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)

    // L.marker([this.deliveryData?.package_id.to_location.lat, this.deliveryData?.package_id.to_location.lng]).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.deliveryData.package_id.from_location.lat, this.deliveryData.package_id.from_location.lng], {}).addTo(this.map)
      .bindPopup('A Sender address')
      .openPopup();

    L.marker([this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng], {}).addTo(this.map)
      .bindPopup('A Recipient address')
      .openPopup();

    this.getDeliveryPosition()

    setInterval(()=>{
      this.refreshLocation()
    }, 20000)
  }


  getDeliveryPosition(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation= {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.webSocketLocationChange(this.currentLocation)
        this.addCurrentPositionToMap()
      })
    }else {
      console.log("No geolocation");
    }
  }

  addCurrentPositionToMap(){

    this.currentMaker = L.marker([this.currentLocation.lat, this.currentLocation.lng]).addTo(this.map)
      .bindPopup('Driver Location')
      .openPopup();

    this.trajet = L.polyline([
      [this.currentLocation.lat, this.currentLocation.lng],
      [this.deliveryData.package_id.to_location.lat, this.deliveryData.package_id.to_location.lng]
    ], {color: 'blue'}).addTo(this.map);

    this.map.fitBounds(this.trajet.getBounds());
  }

  refreshLocation(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation= {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.webSocketLocationChange(this.currentLocation)
        this.currentMaker.setLatLng([this.currentLocation.lat, this.currentLocation.lng]);
        const newRoute = [
          [this.currentLocation.lat, this.currentLocation.lng],
          this.trajet.getLatLngs()[1]
        ]
        this.trajet.setLatLngs(newRoute)
      })
    }else {
      console.log("No geolocation");
    }
  }

  webSocketLocationChange(current: any){
    if(this.deliveryData.status === 'picked-up' || this.deliveryData.status === 'in-transit'){
      if(!this.deliveryData.location || current.lat != this.deliveryData.location.lat || current.lng != this.deliveryData.location.lng){
        const data = {
          event: 'location_changed',
          delivery_id: this.deliveryData.delivery_id,
          location: current
        }
        this.webSocket.sendLocationChange(data)
      }
    }
  }
}
