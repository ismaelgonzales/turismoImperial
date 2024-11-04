import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { ApiResponse, IUsuario } from '../../Usuario';
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
    selector: 'app-usuarios-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './usuarios-form.component.html',
    styleUrl: './usuarios-form.component.scss',
})
export class UsuariosFormComponent implements OnChanges {
    @Input() data: IUsuario | null = null;
    @Output() onCloseModel = new EventEmitter();

    usuariosForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private usuariosService: UsuariosService,
        private toastr: ToastrService,
    ) {
        this.usuariosForm = this.fb.group({
            nombre: new FormControl('', [Validators.required]),
            apellido: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            correo: new FormControl('', [Validators.required]),
            contraseña: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.usuariosForm.patchValue({
                nombre: this.data.nombre,
                apellido: this.data.apellido,
                username: this.data.username,
                correo: this.data.correo,
                contraseña: this.data.contraseña,
            });
        }
    }

    onSubmit() {
        if (this.usuariosForm.valid) {
            const formValue = this.usuariosForm.value;

            if (this.data) {
                this.usuariosService
                    .updateUsuarios(this.data.idUsuario as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetUsuariosForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.usuariosService.createUsuarios(formValue).subscribe({
                    next: () => {
                        this.resetUsuariosForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.usuariosForm.markAllAsTouched();
        }
    }

    resetUsuariosForm() {
        this.usuariosForm.reset();
        this.onClose();
    }
}
