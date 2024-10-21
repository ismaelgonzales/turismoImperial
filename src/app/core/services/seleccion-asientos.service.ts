import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SeleccionAsientosService {
    private pasajeros: any[] = [];
    private totalAmount: number = 0;

    setSelectedPasajeros(pasajeros: any[], total: number) {
        this.pasajeros = pasajeros;
        this.totalAmount = total;
    }
    // setSelectedPasajeros(pasajeros: any[]) {
    //     this.pasajeros = pasajeros;
    // }

    // setSelectedPasajeros1(pasajeros: any[]) {
    //     this.pasajeros = pasajeros;
    // }

    getSelectedPasajeros() {
        return this.pasajeros;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}
