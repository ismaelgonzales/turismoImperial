import { Component, OnInit } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { ProgressBarComponent } from '../../organims/progress-bar/progress-bar.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-datos-pasajero',
    standalone: true,
    imports: [
        HeaderPageComponent,
        ProgressBarComponent,
        DetalladoCompraComponent,
        FooterPageComponent,
        FormsModule,
        CommonModule
    ],
    templateUrl: './datos-pasajero.component.html',
    styleUrl: './datos-pasajero.component.scss',

})
export class DatosPasajeroComponent implements OnInit {
    pasajerosSeleccionados: string[] = [];
    private pasajerosSubscription: Subscription = new Subscription();
    

    constructor(private seleccionAsientosService: SeleccionAsientosService) { }

    ngOnInit() {
        this.pasajerosSubscription = this.seleccionAsientosService.pasajeros$.subscribe(pasajeros => {
            this.pasajerosSeleccionados = pasajeros;
            console.log('Pasajeros seleccionados:', this.pasajerosSeleccionados);
        });
    }

    ngOnDestroy() {
        this.pasajerosSubscription.unsubscribe();
    }
}