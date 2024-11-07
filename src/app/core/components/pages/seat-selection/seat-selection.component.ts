import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-seat-selection',
    standalone: true,
    imports: [
        CommonModule,
        HeaderPageComponent,
        FooterPageComponent,
        DetalladoCompraComponent,
        RouterLink,
    ],
    templateUrl: './seat-selection.component.html',
    styleUrls: ['./seat-selection.component.scss'],
})

export class SeatSelectionComponent implements OnInit {
    @Output() continue = new EventEmitter<void>();



    firstFloorSeats: { seat: number, isSelected: boolean, isOccupied: boolean, isDisabled: boolean }[] = [
        { seat: 1, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 2, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 70, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 3, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 4, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 5, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 80, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 6, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 7, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 8, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 90, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 9, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 10, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 11, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 100, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 12, isSelected: false, isOccupied: false, isDisabled: false }
    ];
    
    secondFloorSeats: { seat: number, isSelected: boolean, isOccupied: boolean, isDisabled: boolean }[] = [
        { seat: 13, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 14, isSelected: false, isOccupied: false, isDisabled: false }, // Ejemplo de asiento deshabilitado
        { seat: 15, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 16, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 17, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 18, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 19, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 20, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 21, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 22, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 110, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 120, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 23, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 24, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 130, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 140, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 25, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 26, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 27, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 28, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 29, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 30, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 31, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 32, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 33, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 34, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 35, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 36, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 37, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 38, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 39, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 40, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 41, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 42, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 43, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 44, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 45, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 46, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 47, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 48, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 49, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 50, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 150, isSelected: false, isOccupied: false, isDisabled: false },
        { seat: 160, isSelected: false, isOccupied: false, isDisabled: false }
    ];
    
    selectedSeats: number[] = [];
    occupiedSeats: Set<number> = new Set();

    pasajerosSeleccionados: number[] = [];
    totalAmount: number = 0;

    // Precios de los asientos
    private firstFloorPrice: number = 45;
    private secondFloorPrice: number = 35;

    constructor(
        private socketService: SocketService,
        private toastr: ToastrService,

        private seleccionAsientosService: SeleccionAsientosService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.listenToSocketEvents();
    
        // Suscripción a asientos$ para obtener los datos de los asientos desde la API
        this.seleccionAsientosService.asientos$.subscribe((apiSeats) => {
            this.actualizarAsientos(apiSeats, this.firstFloorSeats);
            this.actualizarAsientos(apiSeats, this.secondFloorSeats);
        });
    }
    actualizarAsientos(apiSeats: any[], conjuntoAsientos: { seat: number; isSelected: boolean; isOccupied: boolean; isDisabled: boolean }[]) {
        apiSeats.forEach(apiSeat => {
            const matchingSeat = conjuntoAsientos.find(seat => seat.seat === apiSeat.numeroAsiento);
    
            if (matchingSeat) {
                matchingSeat.isDisabled = !apiSeat.estado;  // Si estado es true, isDisabled es false
            }
        });
    }

    toggleButton(seat: { seat: number, isSelected: boolean, isOccupied: boolean, isDisabled: boolean }) {
        // Si el asiento está deshabilitado o ocupado, muestra un mensaje de error
        if (seat.isDisabled || seat.isOccupied) {
            this.toastr.error(`El asiento ${seat.seat} no está disponible para selección.`);
            return;
        }
    
        // Determina el precio del asiento según el array en el que se encuentra
        const seatPrice = this.firstFloorSeats.some(s => s.seat === seat.seat) ? this.firstFloorPrice : this.secondFloorPrice;
    
        // Verifica si el asiento ya está seleccionado
        if (seat.isSelected) {
            seat.isSelected = false; // Desmarca el asiento
            this.selectedSeats = this.selectedSeats.filter(s => s !== seat.seat); // Remueve del listado de asientos seleccionados
            this.pasajerosSeleccionados = this.pasajerosSeleccionados.filter(p => p !== seat.seat); // Actualiza los pasajeros seleccionados
            this.totalAmount -= seatPrice; // Ajusta el monto total
            this.socketService.emitEvent('seatDeselected', seat.seat); // Notifica sobre la deselección
            this.toastr.warning(`Asiento ${seat.seat} ha sido deseleccionado`);
        } else {
            if (this.selectedSeats.length < 4) {
                seat.isSelected = true; // Marca el asiento como seleccionado
                this.selectedSeats.push(seat.seat); // Añade el asiento al listado de seleccionados
                this.pasajerosSeleccionados.push(seat.seat); // Añade al listado de pasajeros
                this.totalAmount += seatPrice; // Ajusta el monto total
                this.socketService.emitEvent('seatSelected', seat.seat); // Notifica sobre la selección
                this.toastr.success(`Asiento ${seat.seat} ha sido seleccionado`);
                this.enviarSeleccion(this.pasajerosSeleccionados, this.totalAmount); // Envia la información de selección
            } else {
                this.toastr.error(`Solo puedes seleccionar hasta 4 asientos.`);
            }
        }
    }
    
    //seleccion de asientos


    //sockets
    isSelected(seat: number): boolean {
        return this.selectedSeats.includes(seat);
    }

    listenToSocketEvents() {
        this.socketService
            .listenEvent('currentSelectedSeats')
            .subscribe((seats: number[]) => {
                this.selectedSeats = seats;
                this.occupiedSeats = new Set(seats);
            });

        this.socketService
            .listenEvent('seatSelected')
            .subscribe((seat: number) => {
                this.occupiedSeats.add(seat);
                if (!this.selectedSeats.includes(seat)) {
                    this.toastr.success(
                        `Asiento ${seat} ha sido seleccionado por otro usuario`,
                    );
                }
            });

        this.socketService
            .listenEvent('seatDeselected')
            .subscribe((seat: number) => {
                this.occupiedSeats.delete(seat);
                this.toastr.warning(
                    `Asiento ${seat} ha sido deseleccionado por otro usuario`,
                );
            });

        // Escuchar si el asiento ya está ocupado
        this.socketService
            .listenEvent('seatOccupied')
            .subscribe((seat: number) => {
                this.toastr.error(`Asiento ${seat} ya está ocupado`);
            });

        // Escuchar si el usuario no es el propietario
        this.socketService.listenEvent('notOwner').subscribe((seat: number) => {
            this.toastr.error(
                `No puedes deseleccionar el asiento ${seat}, no eres el propietario.`,
            );
        });
    }
   
    enviarSeleccion(pasajeros: any[], total: number) {
        this.seleccionAsientosService.setSelectedPasajeros(pasajeros, total);
        // console.log('Pasajeros y monto total enviados al servicio');
    }
    onContinue() {
        this.continue.emit(); // Avanza al siguiente paso
    }
}

