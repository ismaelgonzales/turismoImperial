import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ApiResponse, IVehiculo } from '../../../models/Vehiculo';

import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { VehiculosFormComponent } from '../../../models/pages/vehiculos-form/vehiculos-form.component';

@Component({
    selector: 'app-vehiculos',
    standalone: true,
    imports: [ModelComponent, VehiculosFormComponent],
    templateUrl: './vehiculos.component.html',
    styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements OnInit {
    isModelOpen = false;
    vehiculos: IVehiculo[] = [];
    vehiculo!: IVehiculo;

    constructor(
        private vehiculosService: VehiculoService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllVehiculos();
    }

    getAllVehiculos() {
        this.vehiculosService.getAllVehiculos().subscribe({
            next: response => {
                if (response) {
                    this.vehiculos = response;
                }
            },
        });
    }

    loadVehiculos(vehiculos: IVehiculo) {
        this.vehiculo = vehiculos;
        this.openModel();
    }

    deleteVehiculos(id: number) {
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
                this.vehiculosService.deleteVehiculos(id).subscribe({
                    next: () => {
                        this.toastr.success('Acción realizada con éxito');
                        this.getAllVehiculos();
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
        this.getAllVehiculos();
    }
}
