import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackageComponent } from './package/package.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from '@angular/common/http'
import { PackageService } from './package/package.service';
import { DeliveryService } from './delivery/delivery.service';

@NgModule({
  declarations: [
    AppComponent,
    PackageComponent,
    DeliveryComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PackageService,
    DeliveryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
