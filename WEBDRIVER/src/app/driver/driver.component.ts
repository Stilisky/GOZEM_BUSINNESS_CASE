import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  searchValue: string | undefined;
  error: string | undefined;
  delivery: Delivery | undefined;

  constructor(
    private deliveryService: DeliveryService
  ){}

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

  ngOnInit(): void {

  }
}
