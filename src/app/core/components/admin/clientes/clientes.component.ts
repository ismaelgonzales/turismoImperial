import { Component, OnInit } from '@angular/core';

import { ViajesFormComponent } from '../../../models/pages/viajes-form/viajes-form.component';
import { ToastrService } from 'ngx-toastr';
import { ViajesService } from '../../../services/viajes.service';
import { ApiResponse, IViajes } from '../../../models/Viajes';

import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { ClientesFormComponent } from '../../../models/pages/clientes-form/clientes-form.component';
import { IClientes } from '../../../models/Clientes';
import { ClienteService } from '../../../services/cliente.service';

@Component({
    selector: 'app-clientes',
    standalone: true,
    imports: [ModelComponent, ClientesFormComponent],
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.scss',
})
export class ClientesComponent implements OnInit {
    isModelOpen = false;
    clientes: IClientes[] = [];
    cliente!: IClientes;

    constructor(
        private clientesService: ClienteService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllClientes();
    }

    getAllClientes() {
        this.clientesService.getAllCliente().subscribe({
            next: response => {
                if (response) {
                    this.clientes = response;
                }
            },
        });
    }

    loadClientes(clientes: IClientes) {
        this.cliente = clientes;
        this.openModel();
    }

    deleteClientes(id: number) {
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
                this.clientesService.deleteCliente(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El cliente se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllClientes();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el cliente');
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
        this.getAllClientes();
    }
}
