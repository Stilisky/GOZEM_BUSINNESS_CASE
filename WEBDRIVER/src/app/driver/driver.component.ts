import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';
import { io } from 'socket.io-client';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  searchValue: string | undefined;
  error: string | undefined;
  delivery: any;
  pickedUp: boolean = false;
  inTransit: boolean = false;
  delivered: boolean = false;
  failed: boolean = false;
  // socket = io('http://127.0.0.1:5010').on('delivery_update', (data) => {
  //   this.delivery = data
  //   this.deliveryStatus(this.delivery.status)
  // })

  constructor(
    private deliveryService: DeliveryService,
    private webSocket: WebsocketService
  ){
    webSocket.listenDeliveryUpdate((data) =>{
      if(data.delivery_id === this.delivery.delivery_id){
        this.delivery = data;
      }
    })
  }



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
    const data = {
      event: 'status_changed',
      delivery_id: this.delivery.delivery_id,
      status: stat
    }
    this.webSocket.sendStatusChange(data)
  }


}
