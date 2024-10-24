import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket;

    constructor() {
        // Conectar con el servidor de sockets
        this.socket = io('http://localhost:3000'); // Cambiar por la URL de tu servidor
    }

    // Emitir eventos
    emitEvent(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

    // Escuchar eventos
    listenEvent(eventName: string): Observable<any> {
        return new Observable(subscriber => {
            this.socket.on(eventName, data => {
                subscriber.next(data);
            });
        });
    }
}
