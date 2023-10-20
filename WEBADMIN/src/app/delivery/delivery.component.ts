import { Component, OnInit } from '@angular/core';
import { Package } from '../models/package';
import { PackageService } from '../package/package.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Delivery } from '../models/delivery';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit{
  packageid: string;
  packages: Package[];
  newDelivery: Delivery;

  constructor(
    private packageServices: PackageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.packageServices.getPackages().subscribe(
      packs => this.packages = packs
    );
  }

  onSubmit (){
    console.log(this.packageid);
  }

}
