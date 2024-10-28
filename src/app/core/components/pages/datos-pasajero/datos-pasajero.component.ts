import { Component, OnInit } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { ProgressBarComponent } from '../../organims/progress-bar/progress-bar.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { DniService } from '../../../services/dni.service';
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
    dniArray: string[] = []; // Array para almacenar DNIs
    datosPropietario: any[] = Array(this.pasajerosSeleccionados.length).fill({}); // Array para almacenar datos de propietarios
    

    constructor(
        private seleccionAsientosService: SeleccionAsientosService,
        private dniService: DniService    
    ) { }

    ngOnInit() {
        this.pasajerosSubscription = this.seleccionAsientosService.pasajeros$.subscribe(pasajeros => {
            this.pasajerosSeleccionados = pasajeros;
            console.log('Pasajeros seleccionados:', this.pasajerosSeleccionados);
        });
    }
    buscarDni(index: number) {
        const dni = this.dniArray[index]; // Obtener el DNI correspondiente al pasajero actual
        if (dni) {
            this.dniService.obtenerDatosPorDni(dni).subscribe(
                response => {
                    if (response.success) {
                        this.datosPropietario[index] = response.data; // Almacenar datos del propietario en el índice correspondiente
                        console.log('Datos del propietario:', this.datosPropietario[index]);
                    } else {
                        console.error('Error al obtener datos:', response);
                    }
                },
                error => {
                    console.error('Error de conexión:', error);
                }
            );
        } else {
            console.error('Por favor, ingresa un DNI válido.');
        }
    }

    ngOnDestroy() {
        this.pasajerosSubscription.unsubscribe();
    }
}