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

import { IReservas } from '../../Reservas';
import { ReservaService } from '../../../services/reserva.service';

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
        private reservasService: ReservaService,
        private toastr: ToastrService,
    ) {
        this.reservasForm = this.fb.group({
            idUsuario: new FormControl('', [Validators.required]),
            idRutas: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            fechaReserva: new FormControl('', [Validators.required]),
            estadoReservaId: new FormControl('', [Validators.required]),
            numeroAsientos: new FormControl('', [Validators.required]),
            precioTotal: new FormControl('', [Validators.required]),
            codigoBoleto: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            // idReserva: number;
            // idUsuario: number;
            // idRutas: number;
            // fechaReserva: string;
            // estadoReservaId: string;
            // numeroAsientos: number;
            // precioTotal: number;
            // codigoBoleto: string;
            this.reservasForm.patchValue({
                idUsuario: this.data.idUsuario,
                idRutas: this.data.idRutas,
                fechaReserva: formatDate(
                    this.data.fechaReserva,
                    'yyyy-MM-dd',
                    'en',
                ),
                estadoReservaId: this.data.estadoReservaId,
                numeroAsientos: this.data.numeroAsientos,
                precioTotal: this.data.precioTotal,
                codigoBoleto: this.data.codigoBoleto,
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
                            this.resetViajesForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.reservasService.createReservas(formValue).subscribe({
                    next: () => {
                        this.resetViajesForm();
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

    resetViajesForm() {
        this.reservasForm.reset();
        this.onClose();
    }
}
