import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PaginadorComponent } from '../../atoms/paginador/paginador.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';

import { RutasFormComponent } from '../../../models/pages/rutas-form/rutas-form.component';

import { IRutas } from '../../../models/strapi-model';
import { RutasService } from '../../../services/rutas.service';

@Component({
    selector: 'app-rutas-list',
    standalone: true,
    imports: [
        CommonModule,
        ModelComponent,
        RutasFormComponent,
        FormsModule,
        PaginadorComponent,
    ],
    templateUrl: './rutas-list.component.html',
    styleUrl: './rutas-list.component.scss',
})
export class RutasListComponent {
    @Input() rutas: IRutas[] = [];

    isModelOpen = false;
    RutasPaginados: IRutas[] = [];
    ruta!: IRutas;

    constructor(
        private rutasService: RutasService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllRutas();
    }

    getAllRutas() {
        this.rutasService.getAllRutas().subscribe({
            next: response => {
                if (response) {
                    this.rutas = response;
                }
            },
        });
    }

    loadRutas(rutas: IRutas) {
        this.ruta = rutas;
        this.openModel();
    }

    deleteRutas(id: number) {
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
                this.rutasService.deleteRutas(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'La ruta se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllRutas();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar la ruta');
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
        this.getAllRutas();
    }
    onPageChange(pageItems: IRutas[]) {
        this.RutasPaginados = pageItems;
    }
}
