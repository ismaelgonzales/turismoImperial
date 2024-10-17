import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { ProgressBarComponent } from '../../organims/progress-bar/progress-bar.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-datos-pasajero',
    standalone: true,
    imports: [
        HeaderPageComponent,
        ProgressBarComponent,
        DetalladoCompraComponent,
        FooterPageComponent,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './datos-pasajero.component.html',
    styleUrl: './datos-pasajero.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatosPasajeroComponent implements OnInit {
    selectedButtons: number[] = [];
    pasajerosSeleccionados: { pasajero: number; monto: number }[] = [];
    totalAmount: number = 0;
    pasajeros: any[] = [];

    constructor(
        private router: Router,
        private seleccionAsientosService: SeleccionAsientosService,
    ) {
        this.pasajeros = this.seleccionAsientosService.getSelectedPasajeros();
        // this.totalAmount = this.seleccionAsientosService.getTotalAmount();
    }
    toggleButton(buttonNumber: number) {
        const piso1Precio = 40;
        const piso2Precio = 30;
        let monto = 0;

        // Determinamos el monto del asiento seleccionado
        if (buttonNumber <= 12) {
            monto = piso1Precio; // Piso 1
        } else {
            monto = piso2Precio; // Piso 2
        }

        if (this.selectedButtons.includes(buttonNumber)) {
            // Deseleccionar asiento
            this.selectedButtons = this.selectedButtons.filter(
                num => num !== buttonNumber,
            );
            this.pasajerosSeleccionados = this.pasajerosSeleccionados.filter(
                p => p.pasajero !== buttonNumber,
            );
            this.totalAmount -= monto;
        } else if (this.selectedButtons.length < 4) {
            // Seleccionar asiento
            this.selectedButtons.push(buttonNumber);
            this.pasajerosSeleccionados.push({ pasajero: buttonNumber, monto });
            this.totalAmount += monto;
        }
    }

    isSelected(buttonNumber: number): boolean {
        return this.selectedButtons.includes(buttonNumber);
    }

    ngOnInit() {
        this.pasajeros = this.seleccionAsientosService.getSelectedPasajeros();
    }
}
