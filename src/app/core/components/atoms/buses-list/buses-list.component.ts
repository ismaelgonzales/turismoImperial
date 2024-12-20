import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PaginadorComponent } from '../../atoms/paginador/paginador.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';

import { IBuses } from '../../../models/strapi-model';
import { BusesService } from '../../../services/buses.service';
import { BusesFormComponent } from '../../../models/pages/buses-form/buses-form.component';

@Component({
    selector: 'app-buses-list',
    standalone: true,
    imports: [
        CommonModule,
        ModelComponent,
        BusesFormComponent,
        FormsModule,
        PaginadorComponent,
    ],
    templateUrl: './buses-list.component.html',
    styleUrl: './buses-list.component.scss',
})
export class BusesListComponent {
    @Input() buses: IBuses[] = [];
    isModelOpen = false;

    BusesPaginados: IBuses[] = [];
    bus!: IBuses;

    constructor(
        private busesService: BusesService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllBuses();
    }

    getAllBuses() {
        this.busesService.getAllBuses().subscribe({
            next: response => {
                if (response) {
                    this.buses = response;
                }
            },
        });
    }

    loadBuses(buses: IBuses) {
        this.bus = buses;
        this.openModel();
    }

    deleteBuses(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Esta acción no se puede deshacer!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.isConfirmed) {
                this.busesService.deleteBuses(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El bus se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllBuses();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el bus');
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
        this.getAllBuses();
    }

    onPageChange(pageItems: IBuses[]) {
        this.BusesPaginados = pageItems;
    }
}
