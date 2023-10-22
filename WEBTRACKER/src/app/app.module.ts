import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MapComponent } from './map/map.component';
import { WebsocketService } from './services/websocket.service';
import { DeliveryService } from './services/delivery.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    WebsocketService,
    DeliveryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
