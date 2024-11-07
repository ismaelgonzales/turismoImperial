import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBusesDetalles } from '../models/strapi-model';
import { ApiService } from './api.service';
import { IComprador } from '../models/compraFinal';

@Injectable({
    providedIn: 'root',
})
export class SeleccionAsientosService {
    private pasajeros: any[] = []; // Pasajeros con datos detallados
    private totalAmount: number = 0;
    private documentId: string = '';  // Aquí guardamos el documentId seleccionado del boton de bus-detalle
    private compraFinal : IComprador[] =[] ;
    
    private busSeleccionadoSubject = new BehaviorSubject<any>(null);
    private pasajerosSubject = new BehaviorSubject<any[]>(this.pasajeros);
    private totalAmountSubject = new BehaviorSubject<number>(this.totalAmount);
    private asientosSubject = new BehaviorSubject<any[]>([]);
    private compraFinalSubject =new BehaviorSubject<any[]>([]);

    pasajeros$ = this.pasajerosSubject.asObservable();
    asientos$ = this.asientosSubject.asObservable();
    totalAmount$ = this.totalAmountSubject.asObservable();
    busSeleccionado$ = this.busSeleccionadoSubject.asObservable();
    compraFinal$ = this.compraFinalSubject.asObservable();

    constructor(private _apiService: ApiService) {}
    setCompraFinal(compra : IComprador[]) {
        this.compraFinalSubject.next(compra); 
        console.log('DATOSCOMPRA',this.busSeleccionado$)
    }

    setDocumentId(documentId: string): void {
        this.documentId = documentId;
        console.log('documentId llegó al servicio SeleccionAsientosService:', documentId);
        // Llamamos a la API para obtener los asientos con el documentId
        this.loadAsientos(); // Cargamos los asientos después de establecer el documentId
    }

    // Método para obtener los asientos de un bus con documentId
    private loadAsientos(): void {
        if (this.documentId) {
            this._apiService.getAsientosByDocumentId(this.documentId).subscribe(
                (asientos) => {
                    console.log('Asientos obtenidos:', asientos);  // Muestra los asientos en consola
                    this.asientosSubject.next(asientos);  // Emitimos los datos de los asientos
                },
                (error) => {
                    console.error('Error al obtener los asientos:', error); // Manejo de errores
                }
            );
        }
    } 
 
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
