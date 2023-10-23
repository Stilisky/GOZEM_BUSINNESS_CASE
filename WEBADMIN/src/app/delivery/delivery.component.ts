import { Component, OnInit } from '@angular/core';
import { Package } from '../models/package';
import { PackageService } from '../package/package.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Delivery } from '../models/delivery';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit{
  deliveryid: string;
  packageid: string;
  allpacks: Package[];
  error: string;

  constructor(
    private packageServices: PackageService,
    private router: Router,
    private deliveryServices: DeliveryService
  ){}

  ngOnInit(): void {
    this.packageServices.getPackages().subscribe(
      pack => this.allpacks = pack
    )
  }

  onSubmit (form: NgForm){
    if(this.deliveryid && this.packageid){
      const delivery = new Delivery(this.deliveryid, this.packageid)
      this.deliveryServices.createDelivery(delivery).subscribe(
        (response) => {
          this.router.navigate(['']);
        },
        (err) => {
          this.error = "The Delivery Id is invalid format or already exist!"
        }
      )
    } else {
      this.error = "All fields are mandatory"
    }

  }

}
