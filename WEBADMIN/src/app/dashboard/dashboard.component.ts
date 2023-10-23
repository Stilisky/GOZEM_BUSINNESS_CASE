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
  deliveries: Delivery[];
  currentPageDelivery: number = 1;
  currentPagePackage: number = 1;
  itemsPerPage = 5;

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

  previewPageDeliv(){
    if(this.currentPageDelivery > 1) {
      this.currentPageDelivery--;
    }
  }

  nextPageDeliv(){
    if(this.currentPageDelivery < this.deliveryTotalPage()) {
      this.currentPageDelivery++;
    }
  }

  setDelivPage(page: number){
    this.currentPageDelivery = page
  }

  deliveryPages(){
    const pages: number[] = [];
    for (let i = 1; i <= this.deliveryTotalPage(); i++) {
      pages.push(i);
    }
    return pages;
  }

  deliveryTotalPage(){
    return Math.ceil(this.deliveries.length/this.itemsPerPage);
  }

  previewPagePack(){
    if(this.currentPagePackage > 1) {
      this.currentPagePackage--;
    }
  }

  nextPagePack(){
    if(this.currentPagePackage < this.packageTotalPage()) {
      this.currentPagePackage++;
    }
  }
  setPackagePage(page: number){
    this.currentPagePackage = page
  }

  packageTotalPage(){
    return Math.ceil(this.packages.length/this.itemsPerPage);
  }

  packagePages(){
    const pages: number[] = [];
    for (let i = 1; i <= this.packageTotalPage(); i++) {
      pages.push(i);
    }
    return pages;
  }
}
