import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverComponent } from './driver/driver.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from './services/delivery.service';
import { PackageService } from './services/package.service';
import { HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DeliveryService, PackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
