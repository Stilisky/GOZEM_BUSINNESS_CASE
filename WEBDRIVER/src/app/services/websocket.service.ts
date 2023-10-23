import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client'
import { environment } from 'src/environements/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: Socket = io(`${environment.webSocketServer}`)

  constructor() { }

  sendLocationChange(data: any) {
    this.socket.emit('location_changed', data)
  }

  sendStatusChange(data: any){
    this.socket.emit('status_changed', data)
  }

  listenDeliveryUpdate(callback: (data: any) => void){
    this.socket.on('delivery_update', callback)
  }
}
