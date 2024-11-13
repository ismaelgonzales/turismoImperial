import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { Subscription } from 'rxjs';
import { IBusesDetalles } from '../../../models/strapi-model';
@Component({
    selector: 'app-detallado-compra',
    standalone: true,
    imports: [ CommonModule,],
    templateUrl: './detallado-compra.component.html',
    styleUrl: './detallado-compra.component.scss',
})
export class DetalladoCompraComponent implements OnInit {
    pasajerosSeleccionados: any[] = [];
    totalAmount: number = 0;
    busMostrar: IBusesDetalles[] = [];
    private pasajerosSubscription: Subscription = new Subscription();
    private totalAmountSubscription: Subscription = new Subscription();
    private busSeleccionadoSubscription: Subscription = new Subscription();

    constructor(private seleccionAsientosService: SeleccionAsientosService) { }

    ngOnInit() {
        // Suscribirse a los cambios de pasajeros
        this.pasajerosSubscription = this.seleccionAsientosService.pasajeros$.subscribe(pasajeros => {
            this.pasajerosSeleccionados = pasajeros;
            // console.log('Pasajeros seleccionados:', this.pasajerosSeleccionados);
        });

        // Suscribirse a los cambios del monto total
        this.totalAmountSubscription = this.seleccionAsientosService.totalAmount$.subscribe(total => {
            this.totalAmount = total;
            // console.log('Total amount:', this.totalAmount);
        });
        this.busSeleccionadoSubscription = this.seleccionAsientosService.busSeleccionado$.subscribe(bus => {
            this.busMostrar = bus;
            // console.log('MOSTRAR:', this.busMostrar);
        });
    }

    ngOnDestroy() {
        // Desuscribirse para evitar fugas de memoria
        this.pasajerosSubscription.unsubscribe();
        this.totalAmountSubscription.unsubscribe();
        this.busSeleccionadoSubscription.unsubscribe();
    }
}
