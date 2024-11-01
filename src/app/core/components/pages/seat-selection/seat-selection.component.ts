import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
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
    
    firstFloorSeats: number[]  = [1, 2,0, 3, 4, 5,0, 6, 7, 8,0, 9, 10, 11, 0,12];
    secondFloorSeats: number[] = [
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    selectedSeats: number[] = [];
    occupiedSeats: Set<number> = new Set(); // Para rastrear asientos ocupados
    //Seleccion de asientos
    pasajerosSeleccionados: string[] = [];
    totalAmount: number = 0;

    // Precios de los asientos
    private firstFloorPrice: number = 50;
    private secondFloorPrice: number = 35;

    constructor(
        private socketService: SocketService,
        private toastr: ToastrService,
        //seleccion asientos
        private seleccionAsientosService: SeleccionAsientosService,
        private router: Router,
    ) {}
    
    ngOnInit() {
        this.listenToSocketEvents();
    }

    toggleButton(seat: number) {
        const isFirstFloor = this.firstFloorSeats.includes(seat);
        const seatPrice = isFirstFloor
            ? this.firstFloorPrice
            : this.secondFloorPrice;
    
        if (this.isSelected(seat)) {
            this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
            this.pasajerosSeleccionados = this.pasajerosSeleccionados.filter(
                p => p !== `Asiento ${seat}`,
            );
            this.totalAmount -= seatPrice; // Restar el precio
            this.socketService.emitEvent('seatDeselected', seat);
            this.toastr.warning(`Asiento ${seat} ha sido deseleccionado`);
        } else {
            if (!this.occupiedSeats.has(seat)) {
                if (this.selectedSeats.length < 4) {
                    this.selectedSeats.push(seat);
                    this.pasajerosSeleccionados.push(`Asiento ${seat}`);
                    this.totalAmount += seatPrice; // Sumar el precio
                    this.socketService.emitEvent('seatSelected', seat);
                    this.toastr.success(`Asiento ${seat} ha sido seleccionado`);
                    
                    // Llama a enviarSeleccion después de seleccionar el asiento
                    this.enviarSeleccion(this.pasajerosSeleccionados, this.totalAmount);
                } else {
                    this.toastr.error(
                        `Solo puedes seleccionar hasta 4 asientos.`,
                    );
                }
            } else {
                this.toastr.error(`Asiento ${seat} ya está ocupado`);
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
                this.occupiedSeats = new Set(seats); // Actualizar asientos ocupados
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

