import { Component, OnInit } from '@angular/core';
import { RutasFormComponent } from '../../../models/pages/rutas-form/rutas-form.component';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import { ToastrService } from 'ngx-toastr';
import { RutasService } from '../../../services/rutas.service';
import { ApiResponse, IRutas } from '../../../models/Rutas';
import Swal from 'sweetalert2';
import { PaginadorComponent } from '../../atoms/paginador/paginador.component';

import { RutasListComponent } from '../../atoms/rutas-list/rutas-list.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-rutas',
    standalone: true,
    imports: [
        ModelComponent,
        RutasFormComponent,
        RutasListComponent,
        CommonModule,
        PaginadorComponent,
    ],
    templateUrl: './rutas.component.html',
    styleUrl: './rutas.component.scss',
})
export class RutasComponent implements OnInit {
    isModelOpen = false;
    rutas: IRutas[] = [];
    ruta!: IRutas;

    rutasPaginados: IRutas[] = [];
    rutasFiltrados: IRutas[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 8;

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

    updateRutasPaginados() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.rutasPaginados = this.rutasFiltrados.slice(startIndex, endIndex);
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
        this.rutasPaginados = pageItems;
    }
}
