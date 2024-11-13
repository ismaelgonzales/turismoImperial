import { Component, Input, OnInit } from '@angular/core';
import { PaginadorComponent } from '../../atoms/paginador/paginador.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { ConductoresFormComponent } from '../../../models/pages/conductores-form/conductores-form.component';
import { IConductores } from '../../../models/Conductores';
import { ConductorService } from '../../../services/conductor.service';
import { ConductorListComponent } from '../../atoms/conductor-list/conductor-list.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-conductores',
    standalone: true,
    imports: [
        ModelComponent,
        ConductoresFormComponent,
        FormsModule,
        PaginadorComponent,
        ConductorListComponent,
        CommonModule,
    ],
    templateUrl: './conductores.component.html',
    styleUrl: './conductores.component.scss',
})
export class ConductoresComponent implements OnInit {
    isModelOpen = false;
    conductores: IConductores[] = [];
    conductor!: IConductores;
    nombreFiltro: string = '';
    apellidoFiltro: string = '';

    conductoresPaginados: IConductores[] = [];
    conductoresFiltrados: IConductores[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 8;

    // Variables de filtro

    // get conductoresFiltrados() {
    //     return this.conductores.filter(
    //         conductor =>
    //             conductor.nombre
    //                 .toLowerCase()
    //                 .includes(this.nombreFiltro.toLowerCase()) &&
    //             conductor.apellidos
    //                 .toLowerCase()
    //                 .includes(this.apellidoFiltro.toLowerCase()),
    //     );
    // }
    constructor(
        private conductoresService: ConductorService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllConductores();
    }

    getAllConductores() {
        this.conductoresService.getAllConductores().subscribe({
            next: response => {
                if (response) {
                    this.conductores = response;
                    this.filtrarConductores();
                }
            },
        });
    }

    // getAllConductores() {
    //     this.conductoresService.getAllConductores().subscribe({
    //         next: response => {
    //             if (response) {
    //                 this.conductores = response;
    //                 this.filtrarConductores(); // Filtrar al cargar los datos
    //             }
    //         },
    //     });
    // }

    filtrarConductores() {
        this.conductoresFiltrados = this.conductores.filter(
            conductor =>
                (this.nombreFiltro
                    ? conductor.nombre
                          .toLowerCase()
                          .includes(this.nombreFiltro.toLowerCase())
                    : true) &&
                (this.apellidoFiltro
                    ? conductor.apellidos
                          .toLowerCase()
                          .includes(this.apellidoFiltro.toLowerCase())
                    : true),
        );
        this.currentPage = 1; // Reinicia a la primera página después de filtrar
        this.updateConductoresPaginados();
    }

    updateConductoresPaginados() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.conductoresPaginados = this.conductoresFiltrados.slice(
            startIndex,
            endIndex,
        );
    }

    // onPageChange(page: number) {
    //     this.currentPage = page;
    //     this.updateConductoresPaginados();
    // }

    loadConductores(conductores: IConductores) {
        this.conductor = conductores;
        this.openModel();
    }

    deleteConductores(id: number) {
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
                this.conductoresService.deleteConductores(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El conductor se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllConductores();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el conductor');
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
        this.getAllConductores();
    }

    onPageChange(pageItems: IConductores[]) {
        this.conductoresPaginados = pageItems;
    }
}
