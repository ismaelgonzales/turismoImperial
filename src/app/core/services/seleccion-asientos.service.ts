import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBusesDetalles } from '../models/swagger-model';

@Injectable({
    providedIn: 'root',
})
export class SeleccionAsientosService {
    private pasajeros: any[] = []; // Pasajeros con datos detallados
    private totalAmount: number = 0;
    private busSeleccionadoSubject = new BehaviorSubject<any>(null);
    private pasajerosSubject = new BehaviorSubject<any[]>(this.pasajeros);
    private totalAmountSubject = new BehaviorSubject<number>(this.totalAmount);

    pasajeros$ = this.pasajerosSubject.asObservable();
    totalAmount$ = this.totalAmountSubject.asObservable();
    busSeleccionado$ = this.busSeleccionadoSubject.asObservable();

    setSelectedPasajeros(pasajeros: any[], total: number) {
        this.pasajeros = pasajeros.map(asiento => ({ asiento, propietario: {} })); // Inicia con asientos y propietarios vacíos
        this.totalAmount = total;
        
        this.pasajerosSubject.next(this.pasajeros);
        this.totalAmountSubject.next(this.totalAmount);
    }
    setBusSeleccionado(bus:  IBusesDetalles) {
        this.busSeleccionadoSubject.next(bus); // Emitimos el nuevo valor de busSeleccionado
        console.log('BUS',this.busSeleccionado$)
    }

    // Método para actualizar datos del propietario de un pasajero específico
    updatePropietarioDatos(asientoIndex: number, propietarioData: any) {
        if (this.pasajeros[asientoIndex]) {
            // Actualiza el objeto propietario en lugar de propietarioDni
            this.pasajeros[asientoIndex].propietario = propietarioData; 
            this.pasajerosSubject.next(this.pasajeros); // Emitimos el cambio
        }
    }
    

    getSelectedPasajeros() {
        return this.pasajeros;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}
