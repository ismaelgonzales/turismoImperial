import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SeatSelectionComponent } from '../../pages/seat-selection/seat-selection.component';
@Component({
    selector: 'app-venta-interna',
    standalone: true,
    imports: [CommonModule, SeatSelectionComponent],
    templateUrl: './venta-interna.component.html',
    styleUrl: './venta-interna.component.scss',
})
export class VentaInternaComponent {
    // Variables para controlar el flujo de la venta
    viajes: any[] = []; // Array de viajes disponibles
    viajeSeleccionado: any = null; // Viaje seleccionado
    asientosSeleccionados: any[] = []; // Asientos seleccionados
    pasajeros: any[] = []; // Lista de pasajeros
    totalVenta: number = 0; // Total de la venta
    ventaConfirmada: boolean = false;
    servicio: any[] = [];

    // Formulario de búsqueda
    busquedaForm: FormGroup;

    constructor(private fb: FormBuilder) {
        // Inicializa el formulario de búsqueda de rutas
        this.busquedaForm = this.fb.group({
            origen: ['', Validators.required],
            destino: ['', Validators.required],
            fechaSalida: ['', Validators.required],
            servicio: ['', Validators.required],
        });
    }

    // Método para buscar viajes
    buscarViajes() {
        if (this.busquedaForm.valid) {
            const { origen, destino, fechaSalida, servicio } =
                this.busquedaForm.value;
            // Lógica de búsqueda de viajes, podría ser una llamada al servicio de la API
            // Aquí, simulamos con datos dummy
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

    // Método para seleccionar un viaje de la lista
    seleccionarViaje(viaje: any) {
        this.viajeSeleccionado = viaje;
        this.asientosSeleccionados = [];
        this.pasajeros = [];
        this.totalVenta = 0;
    }

    // Método para manejar la selección de asientos
    seleccionarAsiento(asiento: any) {
        if (this.asientosSeleccionados.length < 5) {
            this.asientosSeleccionados.push(asiento);
            this.actualizarTotal();
        } else {
            alert('Solo se permiten 5 asientos por venta.');
        }
    }

    // Método para actualizar el total
    actualizarTotal() {
        this.totalVenta = this.asientosSeleccionados.reduce(
            (total, asiento) => total + this.viajeSeleccionado.precio,
            0,
        );
    }

    // Método para confirmar la venta
    confirmarVenta() {
        if (this.asientosSeleccionados.length > 0) {
            this.ventaConfirmada = true;
            this.pasajeros = this.asientosSeleccionados.map(
                (asiento, index) => ({
                    nombre: `Pasajero ${index + 1}`,
                    asiento: asiento,
                }),
            );
            // Aquí se realizaría una llamada al servicio para guardar la venta
        } else {
            alert('Debes seleccionar al menos un asiento.');
        }
    }

    // Método para cancelar la venta
    cancelarVenta() {
        this.ventaConfirmada = false;
        this.viajeSeleccionado = null;
        this.asientosSeleccionados = [];
        this.pasajeros = [];
        this.totalVenta = 0;
    }

    // Método para deseleccionar un asiento
    deseleccionarAsiento(asiento: any) {
        this.asientosSeleccionados = this.asientosSeleccionados.filter(
            a => a !== asiento,
        );
        this.actualizarTotal();
    }
}
