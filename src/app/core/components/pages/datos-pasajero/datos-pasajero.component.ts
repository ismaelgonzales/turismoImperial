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
    pasajeros: any[] = [];
    totalAmount: number = 0;

    constructor(
        private router: Router,
        private seleccionAsientosService: SeleccionAsientosService,
    ) {
        this.pasajeros = this.seleccionAsientosService.getSelectedPasajeros();
        this.totalAmount = this.seleccionAsientosService.getTotalAmount();
    }

    ngOnInit() {
        // Obtener los pasajeros desde el servicio
        this.pasajeros = this.seleccionAsientosService.getSelectedPasajeros();
    }
}
