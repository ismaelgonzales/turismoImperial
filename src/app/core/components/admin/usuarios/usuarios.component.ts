import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { UsuariosService } from '../../../services/usuarios.service';
import { IUsuario } from '../../../models/Usuario';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { UsuariosFormComponent } from '../../../models/pages/usuarios-form/usuarios-form.component';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [ModelComponent, UsuariosFormComponent],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit {
    isModelOpen = false;
    usuarios: IUsuario[] = [];
    usuario!: IUsuario;

    constructor(
        private usuariosService: UsuariosService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllUsuarios();
    }

    getAllUsuarios() {
        this.usuariosService.getAllUsuarios().subscribe({
            next: response => {
                if (response) {
                    this.usuarios = response;
                }
            },
        });
    }

    loadUsuarios(usuarios: IUsuario) {
        this.usuario = usuarios;
        this.openModel();
    }
    deleteUsuarios(id: number) {
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
                this.usuariosService.deleteUsuarios(id).subscribe({
                    next: () => {
                        this.toastr.success('Acción realizada con éxito');
                        this.getAllUsuarios();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el usuario');
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
        this.getAllUsuarios();
    }
}
