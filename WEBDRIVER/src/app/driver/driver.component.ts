import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import * as L from 'leaflet';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  searchValue: string | undefined;
  error: string | undefined;
  delivery: Delivery | undefined;
  pickedUp: boolean = false;
  inTransit: boolean = false;
  delivered: boolean = false;
  failed: boolean = false;

  constructor(
    private deliveryService: DeliveryService
  ){}

  onSubmit(form: NgForm){
    if(this.searchValue){
      this.deliveryService.getDelivery(this.searchValue).subscribe(
        (response) => {
          this.error= "";
          this.delivery = response;
          // this.deliveryService.setDeliveryId(this.searchValue)
          this.deliveryStatus(this.delivery.status)
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

  deliveryStatus(stat: string){
    if(stat === "open"){
      this.pickedUp = true;
      this.inTransit = false;
      this.delivered = false;
      this.failed = false;
    } else if(stat === "picked-up"){
      this.pickedUp = false;
      this.inTransit = true;
      this.delivered = false;
      this.failed = false;
    } else if (stat === "in-transit"){
      this.pickedUp = false;
      this.inTransit = false;
      this.delivered = true;
      this.failed = true;
    } else if(stat === "delivered" || stat === "failed"){
      this.pickedUp = false;
      this.inTransit = false;
      this.delivered = false;
      this.failed = false;
    }
  }

  onChangeStatus(stat: string) {
    this.deliveryStatus(stat)
    // if(stat === "open"){

    // } else if(stat === "picked-up"){

    // } else if (stat === "in-transit"){

    // } else if(stat === "delivered" || stat === "failed"){

    // }
  }


}
