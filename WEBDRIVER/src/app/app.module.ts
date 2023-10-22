import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverComponent } from './driver/driver.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from './services/delivery.service';
import { PackageService } from './services/package.service';
import { HttpClientModule} from '@angular/common/http';
import { MapsComponent } from './maps/maps.component'
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DeliveryService, PackageService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
