import { Component, OnInit } from '@angular/core';

import { ViajesFormComponent } from '../../../models/pages/viajes-form/viajes-form.component';
import { ToastrService } from 'ngx-toastr';
import { ViajesService } from '../../../services/viajes.service';
import { ApiResponse, IViajes } from '../../../models/Viajes';

import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-viajes',
    standalone: true,
    imports: [ModelComponent, ViajesFormComponent],
    templateUrl: './viajes.component.html',
    styleUrl: './viajes.component.scss',
})
export class ViajesComponent implements OnInit {
    isModelOpen = false;
    viajes: IViajes[] = [];
    viaje!: IViajes;

    constructor(
        private viajeService: ViajesService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllViajes();
    }

    getAllViajes() {
        this.viajeService.getAllViaje().subscribe({
            next: response => {
                if (response) {
                    this.viajes = response;
                }
            },
        });
    }

    loadViaje(viajes: IViajes) {
        this.viaje = viajes;
        this.openModel();
    }

    deleteViaje(id: number) {
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
                this.viajeService.deleteViaje(id).subscribe({
                    next: () => {
                        this.toastr.success('Acción realizada con éxito');
                        this.getAllViajes();
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
        this.getAllViajes();
    }
}
