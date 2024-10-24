import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-detallado-compra',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './detallado-compra.component.html',
    styleUrl: './detallado-compra.component.scss',
})
export class DetalladoCompraComponent {
    selectedSeats: number[] = [];
    @Input() pasajerosSeleccionados: { pasajero: number; monto: number }[] = [];
    @Input() totalAmount: number = 0;
}
