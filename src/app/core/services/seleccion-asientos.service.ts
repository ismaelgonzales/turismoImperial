// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { IBusesDetalles } from '../models/swagger-model';

// @Injectable({
//     providedIn: 'root',
// })
// export class SeleccionAsientosService {
//     private pasajeros: any[] = []; // Pasajeros con datos detallados
//     private totalAmount: number = 0;
//     private busSeleccionadoSubject = new BehaviorSubject<any>(null);
//     private pasajerosSubject = new BehaviorSubject<any[]>(this.pasajeros);
//     private totalAmountSubject = new BehaviorSubject<number>(this.totalAmount);

//     pasajeros$ = this.pasajerosSubject.asObservable();
//     totalAmount$ = this.totalAmountSubject.asObservable();
//     busSeleccionado$ = this.busSeleccionadoSubject.asObservable();

//     setSelectedPasajeros(pasajeros: any[], total: number) {
//         this.pasajeros = pasajeros.map(asiento => ({ asiento, propietario: {} })); // Inicia con asientos y propietarios vacíos
//         this.totalAmount = total;

//         this.pasajerosSubject.next(this.pasajeros);
//         this.totalAmountSubject.next(this.totalAmount);
//     }
//     setBusSeleccionado(bus:  IBusesDetalles) {
//         this.busSeleccionadoSubject.next(bus); // Emitimos el nuevo valor de busSeleccionado
//         console.log('BUS',this.busSeleccionado$)
//     }

//     // Método para actualizar datos del propietario de un pasajero específico
//     updatePropietarioDatos(asientoIndex: number, propietarioData: any) {
//         if (this.pasajeros[asientoIndex]) {
//             // Actualiza el objeto propietario en lugar de propietarioDni
//             this.pasajeros[asientoIndex].propietario = propietarioData;
//             this.pasajerosSubject.next(this.pasajeros); // Emitimos el cambio
//         }
//     }

//     getSelectedPasajeros() {
//         return this.pasajeros;
//     }

//     getTotalAmount() {
//         return this.totalAmount;
//     }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBusesDetalles } from '../models/strapi-model';
import { ApiService } from './api.service';
import { IComprador } from '../models/compraFinal';
import { IProductStripe } from '../models/productStripe.interface';


@Injectable({
    providedIn: 'root',
})
export class SeleccionAsientosService {
    private pasajeros: any[] = []; // Pasajeros con datos detallados
    private totalAmount: number = 0;
    private documentId: string = '';  // Aquí guardamos el documentId seleccionado del boton de bus-detalle
    private compraFinal: IComprador[] = [];
    private busSeleccionado: IBusesDetalles[] = [];

    private busSeleccionadoSubject = new BehaviorSubject<IBusesDetalles []>(this.busSeleccionado); // documentId de bus
    private pasajerosSubject = new BehaviorSubject<any[]>(this.pasajeros);
    private totalAmountSubject = new BehaviorSubject<number>(this.totalAmount);
    private asientosSubject = new BehaviorSubject<any[]>([]);
    private compraFinalSubject = new BehaviorSubject<any[]>([]); // datos para recibo o fac

    busSeleccionado$ = this.busSeleccionadoSubject.asObservable(); // documentId de bus 
    pasajeros$ = this.pasajerosSubject.asObservable();
    asientos$ = this.asientosSubject.asObservable();
    totalAmount$ = this.totalAmountSubject.asObservable();
    compraFinal$ = this.compraFinalSubject.asObservable(); // datos para recibo o fac
    static totalAmount$: any;

    constructor(private _apiService: ApiService) {}

    // Método para configurar la compra final
    setCompraFinal(compra: IComprador[]) {
        this.compraFinalSubject.next(compra);
    }

    // setDocumentId(documentId: string): void {
    //     this.documentId = documentId;
    //     console.log('documentId llegó al servicio SeleccionAsientosService:', documentId);
    //     this.loadAsientos(); // Cargamos los asientos después de establecer el documentId
    // }

    // Método para obtener los asientos de un bus con documentId
    private loadAsientos(): void {
        if (this.documentId) {
            this._apiService.getAsientosByDocumentId(this.documentId).subscribe(
                (asientos) => {
                    console.log('Asientos obtenidos:', asientos);
                    this.asientosSubject.next(asientos);
                },
                (error) => {
                    console.error('Error al obtener los asientos:', error);
                }
            );
        }
    }

    setSelectedPasajeros(pasajeros: any[], total: number) {
        this.pasajeros = pasajeros.map(asiento => ({ asiento, propietario: {} }));
        this.totalAmount = total;

        this.pasajerosSubject.next(this.pasajeros);
        this.totalAmountSubject.next(this.totalAmount);
    }

    setBusSeleccionado(bus: IBusesDetalles[]): void {
        console.log('Bus recibido en el servicio:', bus); // Muestra el objeto completo del bus
        this.busSeleccionadoSubject.next(bus);  // Actualiza el BehaviorSubject con el objeto completo del bus
    }


    // Método para actualizar datos del propietario de un pasajero específico
    updatePropietarioDatos(asientoIndex: number, propietarioData: any) {
        if (this.pasajeros[asientoIndex]) {
            this.pasajeros[asientoIndex].propietario = propietarioData;
            this.pasajerosSubject.next(this.pasajeros);
        }
    }


    getSelectedPasajeros() {
        return this.pasajeros;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}
