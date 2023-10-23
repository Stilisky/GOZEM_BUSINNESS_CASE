import { Component } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { WebsocketService } from '../services/websocket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent {
  searchValue: string | undefined;
  error: string | undefined;
  delivery: any;


  constructor(
    private deliveryService: DeliveryService,
    private webSocket: WebsocketService
  ){
    webSocket.listenDeliveryUpdate((data) =>{
      this.delivery = data;
    })
  }



  onSubmit(form: NgForm){
    if(this.searchValue){
      this.deliveryService.getDelivery(this.searchValue).subscribe(
        (response) => {
          this.error= "";
          this.delivery = response;
        },
        (err) => {
          this.error = "This delivery Id doesn't exist. Try again!"
        }
      )

    } else {
      this.error = "Delivery Id is required. Please try again!"
    }
  }
}
