import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SeleccionAsientosService {
    private pasajeros: any[] = []; // Pasajeros con datos detallados
    private totalAmount: number = 0;

    private pasajerosSubject = new BehaviorSubject<any[]>(this.pasajeros);
    private totalAmountSubject = new BehaviorSubject<number>(this.totalAmount);

    pasajeros$ = this.pasajerosSubject.asObservable();
    totalAmount$ = this.totalAmountSubject.asObservable();

    setSelectedPasajeros(pasajeros: any[], total: number) {
        this.pasajeros = pasajeros.map(asiento => ({ asiento, propietario: {} })); // Inicia con asientos y propietarios vacíos
        this.totalAmount = total;

        this.pasajerosSubject.next(this.pasajeros);
        this.totalAmountSubject.next(this.totalAmount);
    }

    // Método para actualizar datos del propietario de un pasajero específico
    updatePropietarioDatos(asientoIndex: number, propietarioData: any) {
        if (this.pasajeros[asientoIndex]) {
            this.pasajeros[asientoIndex].propietario = propietarioData;
            this.pasajerosSubject.next(this.pasajeros); // Emitimos el cambio
            // console.log(this.pasajeros$)
        }
    }

    getSelectedPasajeros() {
        return this.pasajeros;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}
