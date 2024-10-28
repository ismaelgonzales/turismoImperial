import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-detallado-compra',
    standalone: true,
    imports: [RouterLink, CommonModule,],
    templateUrl: './detallado-compra.component.html',
    styleUrl: './detallado-compra.component.scss',
})
export class DetalladoCompraComponent implements OnInit {
    // selectedSeats: number[] = [];
    // @Input() pasajerosSeleccionados: { pasajero: number; monto: number }[] = [];
    // @Input() totalAmount: number = 0; este codigo se peude borrar una ves este conectado con el servicio de selecionasientos
    pasajerosSeleccionados: any[] = [];
    totalAmount: number = 0;
    private pasajerosSubscription: Subscription = new Subscription();
    private totalAmountSubscription: Subscription = new Subscription();

    constructor(private seleccionAsientosService: SeleccionAsientosService) {}

    ngOnInit() {
        // Suscribirse a los cambios de pasajeros
        this.pasajerosSubscription = this.seleccionAsientosService.pasajeros$.subscribe(pasajeros => {
            this.pasajerosSeleccionados = pasajeros;
            console.log('Pasajeros seleccionados:', this.pasajerosSeleccionados);
        });

        // Suscribirse a los cambios del monto total
        this.totalAmountSubscription = this.seleccionAsientosService.totalAmount$.subscribe(total => {
            this.totalAmount = total;
            console.log('Total amount:', this.totalAmount);
        });
    }

    ngOnDestroy() {
        // Desuscribirse para evitar fugas de memoria
        this.pasajerosSubscription.unsubscribe();
        this.totalAmountSubscription.unsubscribe();
    }
}
