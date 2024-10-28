import { Component, OnInit } from '@angular/core';
import { IncidenciasFormComponent } from '../../../models/pages/incidencias-form/incidencias-form.component';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { IIncidencias } from '../../../models/Incidencias';
import { IncidenciasService } from '../../../services/incidencias.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-incidencias',
    standalone: true,
    imports: [ModelComponent, IncidenciasFormComponent],
    templateUrl: './incidencias.component.html',
    styleUrl: './incidencias.component.scss',
})
export class IncidenciasComponent implements OnInit {
    isModelOpen = false;
    incidencias: IIncidencias[] = [];
    incidencia!: IIncidencias;

    constructor(
        private incidenciasService: IncidenciasService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllIncidencias();
    }

    getAllIncidencias() {
        this.incidenciasService.getAllIncidencias().subscribe({
            next: response => {
                if (response) {
                    this.incidencias = response;
                }
            },
        });
    }

    loadIncidencias(incidencias: IIncidencias) {
        this.incidencia = incidencias;
        this.openModel();
    }

    deleteIncidencias(id: number) {
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
                this.incidenciasService.deleteIncidencias(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'La incidencia se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllIncidencias();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar la incidencia');
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
        this.getAllIncidencias();
    }
}
