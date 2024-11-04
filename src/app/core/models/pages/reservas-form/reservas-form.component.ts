import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';

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
import { ReservasService } from '../../../services/reservas.service';
import { IReservas } from '../../Reservas';

@Component({
    selector: 'app-reservas-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './reservas-form.component.html',
    styleUrl: './reservas-form.component.scss',
})
export class ReservasFormComponent implements OnChanges {
    @Input() data: IReservas | null = null;
    @Output() onCloseModel = new EventEmitter();

    reservasForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private reservasService: ReservasService,
        private toastr: ToastrService,
    ) {
        this.reservasForm = this.fb.group({
            idUsuario: new FormControl('', [Validators.required]),
            idRutas: new FormControl('', [Validators.required]),
            fechaReserva: new FormControl('', [Validators.required]),
            idEstadoReserva: new FormControl('', [Validators.required]),
            numeroAsientos: new FormControl('', [Validators.required]),
            diaViaje: new FormControl('', [Validators.required]),
            precioTotal: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            codigoBoleto: new FormControl('', [Validators.required]),
            idCliente: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.reservasForm.patchValue({
                idUsuario: this.data.idUsuario,
                idRutas: this.data.idRutas,
                fechaReserva: this.data.fechaReserva,
                idEstadoReserva: this.data.idEstadoReserva,
                numeroAsientos: this.data.numeroAsientos,
                diaViaje: formatDate(this.data.diaViaje, 'yyyy-MM-dd', 'en'),
                precioTotal: this.data.precioTotal,
                codigoBoleto: this.data.codigoBoleto,
                idCliente: this.data.idCliente,
                estado: this.data.estado,
            });
        }
    }

    onSubmit() {
        if (this.reservasForm.valid) {
            const formValue = this.reservasForm.value;

            if (this.data) {
                this.reservasService
                    .updateReservas(this.data.idReserva as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetReservasForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.reservasService.createReservas(formValue).subscribe({
                    next: () => {
                        this.resetReservasForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.reservasForm.markAllAsTouched();
        }
    }

    resetReservasForm() {
        this.reservasForm.reset();
        this.onClose();
    }
}
