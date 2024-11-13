import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io('https://backend-production-93b1.up.railway.app');
    }
    emitEvent(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

    listenEvent(eventName: string): Observable<any> {
        return new Observable(subscriber => {
            this.socket.on(eventName, data => {
                subscriber.next(data);
            });
        });
    }
}
