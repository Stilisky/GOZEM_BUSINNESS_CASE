import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from '../models/package';
import { PackageService } from './package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  error: string;
  package_id: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location_lat: number;
  from_location_lng: number;
  to_name: string;
  to_address: string;
  to_location_lat: number;
  to_location_lng: number;

  constructor(
    private route: Router,
    private packageService: PackageService
  ){}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    if(form.value){
      const newPackage = new Package(this.package_id, this.description, this.weight, this.width, this.height, this.depth,this.from_name, this.from_address, {lat: this.from_location_lat, lng: this.from_location_lng},
        this.to_name, this.to_address, {lat: this.to_location_lat, lng: this.to_location_lng})
      this.packageService.createPackage(newPackage).subscribe(
        (response) =>{
          this.route.navigate(['']);
        },
        (err) => {
          this.error = "The package id is incorrect or already exist. Please check and try again!\n These fields (*) are mandatory"
        }
      )
    } else {
      this.error = "These fields (*) are mandatory"
      // console.log(this.error);
    }
  }

}
