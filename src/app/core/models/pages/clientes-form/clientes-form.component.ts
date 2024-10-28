import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { ApiResponse, IViajes } from '../../Viajes';
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
import { ViajesService } from '../../../services/viajes.service';
import { IClientes } from '../../Clientes';
import { ClienteService } from '../../../services/cliente.service';

@Component({
    selector: 'app-clientes-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './clientes-form.component.html',
    styleUrl: './clientes-form.component.scss',
})
export class ClientesFormComponent implements OnChanges {
    @Input() data: IClientes | null = null;
    @Output() onCloseModel = new EventEmitter();

    clientesForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private clientesService: ClienteService,
        private toastr: ToastrService,
    ) {
        this.clientesForm = this.fb.group({
            nombres: new FormControl('', [Validators.required]),
            apellidos: new FormControl('', [Validators.required]),
            tipoDocumento: new FormControl('', [Validators.required]),
            numeroDocumento: new FormControl('', [Validators.required]),
            razonSocial: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            telefono: new FormControl('', [Validators.required]),
            edad: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required]),
            fechaCreacion: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.clientesForm.patchValue({
                nombres: this.data.nombres,
                apellidos: this.data.apellidos,
                tipoDocumento: this.data.tipoDocumento,
                numeroDocumento: this.data.numeroDocumento,
                razonSocial: this.data.razonSocial,
                email: this.data.email,
                telefono: this.data.telefono,
                edad: this.data.edad,
                direccion: this.data.direccion,
                estado: this.data.estado,
                fechaCreacion: formatDate(
                    this.data.fechaCreacion,
                    'yyyy-MM-dd',
                    'en',
                ),
            });
        }
    }

    onSubmit() {
        if (this.clientesForm.valid) {
            const formValue = this.clientesForm.value;

            if (this.data) {
                this.clientesService
                    .updateCliente(this.data.idCliente as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetClientesForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.clientesService.createCliente(formValue).subscribe({
                    next: () => {
                        this.resetClientesForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.clientesForm.markAllAsTouched();
        }
    }

    resetClientesForm() {
        this.clientesForm.reset();
        this.onClose();
    }
}
