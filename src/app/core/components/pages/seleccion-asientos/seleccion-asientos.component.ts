import { Component } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { ProgressBarComponent } from '../../organims/progress-bar/progress-bar.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'app-seleccion-asientos',
    standalone: true,
    imports: [
        HeaderPageComponent,
        ProgressBarComponent,
        DetalladoCompraComponent,
        NgFor,
        NgClass,
    ],
    templateUrl: './seleccion-asientos.component.html',
    styleUrl: './seleccion-asientos.component.scss',
})
export class SeleccionAsientosComponent {
    selectedButtons: number[] = [];

    toggleButton(buttonNumber: number) {
        if (this.selectedButtons.includes(buttonNumber)) {
            // Si el botón ya está seleccionado, lo deseleccionamos
            this.selectedButtons = this.selectedButtons.filter(
                num => num !== buttonNumber,
            );
        } else if (this.selectedButtons.length < 4) {
            // Si no está seleccionado y hay espacio, lo seleccionamos
            this.selectedButtons.push(buttonNumber);
        }
    }

    isSelected(buttonNumber: number): boolean {
        return this.selectedButtons.includes(buttonNumber);
    }
}
