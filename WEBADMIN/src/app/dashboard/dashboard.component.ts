import { Component, OnInit } from '@angular/core';
import { Package } from '../models/package';
import { Delivery } from '../models/delivery';
import { PackageService } from '../package/package.service';
import { DeliveryService } from '../delivery/delivery.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  packages: Package[];
  deliveries: Delivery[]

  constructor(
    private packageServices: PackageService,
    private deliveryServices: DeliveryService
  ){}

  ngOnInit(): void {
    this.packageServices.getPackages().subscribe(
      packs => this.packages = packs
    );

    this.deliveryServices.getDeliveries().subscribe(
      delivs => this.deliveries = delivs
    );
  }
}
