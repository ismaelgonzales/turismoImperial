import { Component } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { ProgressBarComponent } from '../../organims/progress-bar/progress-bar.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { NgClass, NgFor } from '@angular/common';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-seleccion-asientos',
    standalone: true,
    imports: [
        HeaderPageComponent,
        ProgressBarComponent,
        DetalladoCompraComponent,
        NgFor,
        NgClass,
        FooterPageComponent,
        RouterLink,
    ],
    templateUrl: './seleccion-asientos.component.html',
    styleUrls: ['./seleccion-asientos.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SeleccionAsientosComponent {
    selectedButtons: number[] = [];
    pasajerosSeleccionados: { pasajero: number; monto: number }[] = [];
    totalAmount: number = 0;
    selectedPasajeros: any[] = [];

    constructor(
        private seleccionAsientosService: SeleccionAsientosService,
        private router: Router,
    ) {}

    toggleButton(buttonNumber: number) {
        const piso1Precio = 40;
        const piso2Precio = 30;
        let monto = 0;

        if (buttonNumber <= 12) {
            monto = piso1Precio;
        } else {
            monto = piso2Precio;
        }

        if (this.selectedButtons.includes(buttonNumber)) {
            this.selectedButtons = this.selectedButtons.filter(
                num => num !== buttonNumber,
            );
            this.pasajerosSeleccionados = this.pasajerosSeleccionados.filter(
                p => p.pasajero !== buttonNumber,
            );
            this.totalAmount -= monto;
        } else if (this.selectedButtons.length < 4) {
            this.selectedButtons.push(buttonNumber);
            this.pasajerosSeleccionados.push({ pasajero: buttonNumber, monto });
            this.totalAmount += monto;
        }
    }

    isSelected(buttonNumber: number): boolean {
        return this.selectedButtons.includes(buttonNumber);
    }

    onContinuar() {
        this.seleccionAsientosService.setSelectedPasajeros(
            this.selectedPasajeros,
            this.totalAmount,
        );
        this.router.navigate(['/datos-pasajero']);
    }
}
