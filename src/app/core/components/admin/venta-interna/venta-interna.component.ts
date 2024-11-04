import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { VentaInternaService } from '../../../services/venta-interna.service';
import { CommonModule } from '@angular/common';
import { SeatSelectionComponent } from '../../pages/seat-selection/seat-selection.component';

@Component({
    selector: 'app-venta-interna',
    standalone: true,
    imports: [CommonModule, SeatSelectionComponent, ReactiveFormsModule],
    templateUrl: './venta-interna.component.html',
    styleUrls: ['./venta-interna.component.scss'],
})
export class VentaInternaComponent {
    viajes: any[] = [];
    viajeSeleccionado: any = null;
    asientosSeleccionados: any[] = [];
    pasajeros: any[] = [];
    totalVenta: number = 0;
    ventaConfirmada: boolean = false;
    busquedaForm: FormGroup;

    servicio: string[] = ['regular', 'premium', 'VIP'];

    constructor(
        private fb: FormBuilder,
        private ventainternaService: VentaInternaService,
    ) {
        this.busquedaForm = this.fb.group({
            origen: ['', Validators.required],
            destino: ['', Validators.required],
            fechaSalida: ['', Validators.required],
            servicio: ['', Validators.required],
        });
    }

    buscarViajes() {
        if (this.busquedaForm.valid) {
            const { origen, destino, fechaSalida, servicio } =
                this.busquedaForm.value;
            this.viajes = [
                {
                    id: 1,
                    origen,
                    destino,
                    fechaSalida,
                    horaSalida: '08:00',
                    horaLlegada: '12:00',
                    precio: 50,
                    servicio: 'regular',
                },
                {
                    id: 2,
                    origen,
                    destino,
                    fechaSalida,
                    horaSalida: '15:00',
                    horaLlegada: '19:00',
                    precio: 60,
                    servicio: 'regular',
                },
            ];
        }
    }

    seleccionarViaje(viaje: any) {
        this.viajeSeleccionado = viaje;
        this.asientosSeleccionados = [];
        this.pasajeros = [];
        this.totalVenta = 0;
    }

    seleccionarAsiento(asiento: any) {
        if (this.asientosSeleccionados.length < 5) {
            this.asientosSeleccionados.push(asiento);
            this.actualizarTotal();
        } else {
            alert('Solo se permiten 5 asientos por venta.');
        }
    }

    actualizarTotal() {
        this.totalVenta = this.asientosSeleccionados.reduce(
            (total, asiento) => total + this.viajeSeleccionado.precio,
            0,
        );
    }

    confirmarVenta() {
        if (this.asientosSeleccionados.length > 0) {
            const ventaData = {
                viajeId: this.viajeSeleccionado.id,
                asientos: this.asientosSeleccionados,
                total: this.totalVenta,
            };

            this.ventainternaService.confirmarVenta(ventaData).subscribe({
                next: response => {
                    this.ventaConfirmada = true;
                    this.pasajeros = this.asientosSeleccionados.map(
                        (asiento, index) => ({
                            nombre: `Pasajero ${index + 1}`,
                            asiento: asiento,
                        }),
                    );
                    alert('Venta confirmada con éxito');
                },
                error: error => {
                    console.error('Error al confirmar la venta:', error);
                    alert('Error al confirmar la venta');
                },
            });
        } else {
            alert('Debes seleccionar al menos un asiento.');
        }
    }

    cancelarVenta() {
        this.ventaConfirmada = false;
        this.viajeSeleccionado = null;
        this.asientosSeleccionados = [];
        this.pasajeros = [];
        this.totalVenta = 0;
    }

    deseleccionarAsiento(asiento: any) {
        this.asientosSeleccionados = this.asientosSeleccionados.filter(
            a => a !== asiento,
        );
        this.actualizarTotal();
    }
}
