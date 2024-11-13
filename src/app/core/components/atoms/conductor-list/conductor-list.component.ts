import { Component, Input } from '@angular/core';
import { IConductores } from '../../../models/Conductores';
import { CommonModule } from '@angular/common';

import { PaginadorComponent } from '../../atoms/paginador/paginador.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { ConductoresFormComponent } from '../../../models/pages/conductores-form/conductores-form.component';

import { ConductorService } from '../../../services/conductor.service';

@Component({
    selector: 'app-conductor-list',
    standalone: true,
    imports: [
        CommonModule,
        ModelComponent,
        ConductoresFormComponent,
        FormsModule,
        PaginadorComponent,
    ],
    templateUrl: './conductor-list.component.html',
    styleUrl: './conductor-list.component.scss',
})
export class ConductorListComponent {
    @Input() conductores: IConductores[] = [];

    isModelOpen = false;
    // conductores: IConductores[] = [];
    conductor!: IConductores;
    nombreFiltro: string = '';
    apellidoFiltro: string = '';
    datosOriginales: any[] = []; // Tu lista original de datos
    datosFiltrados: any[] = []; // Lista que mostrarás en el template

    conductoresPaginados: IConductores[] = [];

    get conductoresFiltrados() {
        return this.conductores.filter(
            conductor =>
                conductor.nombre
                    .toLowerCase()
                    .includes(this.nombreFiltro.toLowerCase()) &&
                conductor.apellidos
                    .toLowerCase()
                    .includes(this.apellidoFiltro.toLowerCase()),
        );
    }
    constructor(
        private conductoresService: ConductorService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllConductores();
        this.datosFiltrados = [...this.datosOriginales];
    }

    getAllConductores() {
        this.conductoresService.getAllConductores().subscribe({
            next: response => {
                if (response) {
                    this.conductores = response;
                }
            },
        });
    }

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

    filtrarDatos(): void {
        console.log('Botón de filtrar clickeado'); // Verifica si el método se llama
        const nombre = this.nombreFiltro.toLowerCase();
        const apellido = this.apellidoFiltro.toLowerCase();

        this.datosFiltrados = this.datosOriginales.filter(
            item =>
                item.nombre.toLowerCase().includes(nombre) &&
                item.apellido.toLowerCase().includes(apellido),
        );

        console.log('Datos filtrados:', this.datosFiltrados); // Verifica el resultado del filtrado
    }
}
