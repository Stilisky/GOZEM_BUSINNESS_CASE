import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: Socket = io('http://127.0.0.1:5010')

  constructor() { }

  listenDeliveryUpdate(callback: (data: any) => void){
    this.socket.on('delivery_update', callback)
  }
}
