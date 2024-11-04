import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import { ReservasFormComponent } from '../../../models/pages/reservas-form/reservas-form.component';
import { ToastrService } from 'ngx-toastr';
import { ReservasService } from '../../../services/reservas.service';
import { ApiResponse, IReservas } from '../../../models/Reservas';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-reservas',
    standalone: true,
    imports: [ModelComponent, ReservasFormComponent],
    templateUrl: './reservas.component.html',
    styleUrl: './reservas.component.scss',
})
export class ReservasComponent implements OnInit {
    isModelOpen = false;
    reservas: IReservas[] = [];
    reserva!: IReservas;

    constructor(
        private reservasService: ReservasService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllReservas();
    }

    getAllReservas() {
        this.reservasService.getAllReservas().subscribe({
            next: response => {
                if (response) {
                    this.reservas = response;
                }
            },
        });
    }

    loadReservas(reservas: IReservas) {
        this.reserva = reservas;
        this.openModel();
    }

    deleteReservas(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.isConfirmed) {
                this.reservasService.deleteReservas(id).subscribe({
                    next: () => {
                        this.toastr.success('Acción realizada con éxito');
                        this.getAllReservas();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el viaje');
                    },
                });
            }
        });
    }

    openModel() {
        this.isModelOpen = true;
    }

    closeModel() {
        this.isModelOpen = false;
        this.getAllReservas();
    }
}
