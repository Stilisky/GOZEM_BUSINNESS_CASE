import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: Socket = io(`${environment.webSocketServer}`)

  constructor() { }

  listenDeliveryUpdate(callback: (data: any) => void){
    this.socket.on('delivery_update', callback)
  }
}
