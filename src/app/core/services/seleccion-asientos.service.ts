import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SeleccionAsientosService {
    private pasajeros: any[] = [];
    private totalAmount: number = 0;

    // Crea un BehaviorSubject para pasajeros y totalAmount
    private pasajerosSubject = new BehaviorSubject<any[]>(this.pasajeros);
    private totalAmountSubject = new BehaviorSubject<number>(this.totalAmount);

    // Observable para que los componentes se suscriban
    pasajeros$ = this.pasajerosSubject.asObservable();
    totalAmount$ = this.totalAmountSubject.asObservable();

    setSelectedPasajeros(pasajeros: any[], total: number) {
        this.pasajeros = pasajeros;
        this.totalAmount = total;

        // Emitir nuevos valores
        this.pasajerosSubject.next(this.pasajeros);
        this.totalAmountSubject.next(this.totalAmount);
    }

    getSelectedPasajeros() {
        return this.pasajeros;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}
