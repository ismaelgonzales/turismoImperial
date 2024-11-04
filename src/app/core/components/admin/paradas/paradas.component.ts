import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IParadas } from '../../../models/Paradas';
import { ParadasService } from '../../../services/paradas.service';

import Swal from 'sweetalert2';
import { ParadasFormComponent } from '../../../models/pages/paradas-form/paradas-form.component';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
@Component({
    selector: 'app-paradas',
    standalone: true,
    imports: [ModelComponent, ParadasFormComponent],
    templateUrl: './paradas.component.html',
    styleUrl: './paradas.component.scss',
})
export class ParadasComponent implements OnInit {
    isModelOpen = false;
    paradas: IParadas[] = [];
    parada!: IParadas;

    constructor(
        private paradasService: ParadasService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllParadas();
    }

    getAllParadas() {
        this.paradasService.getAllParadas().subscribe({
            next: response => {
                if (response) {
                    this.paradas = response;
                }
            },
        });
    }

    loadParadas(paradas: IParadas) {
        this.parada = paradas;
        this.openModel();
    }

    deleteParadas(id: number) {
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
                this.paradasService.deleteParadas(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El reporte se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllParadas();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el reporte');
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
        this.getAllParadas();
    }
}
