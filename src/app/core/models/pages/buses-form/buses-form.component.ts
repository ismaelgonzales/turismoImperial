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
import { IBuses } from '../../Buses';
import { BusesService } from '../../../services/buses.service';

@Component({
    selector: 'app-buses-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './buses-form.component.html',
    styleUrl: './buses-form.component.scss',
})
export class BusesFormComponent implements OnChanges {
    @Input() data: IBuses | null = null;
    @Output() onCloseModel = new EventEmitter();

    busesForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private busesService: BusesService,
        private toastr: ToastrService,
    ) {
        this.busesForm = this.fb.group({
            servicio: new FormControl('', [Validators.required]),
            precioMinimo: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            precioPromedio: new FormControl('', [Validators.required]),
            numeroAsientos: new FormControl('', [Validators.required]),
            idConductor: new FormControl('', [Validators.required]),
            idRutas: new FormControl('', [Validators.required]),
            fechaSalida: new FormControl('', [Validators.required]),
            fechaLlegada: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.busesForm.patchValue({
                servicio: this.data.servicio,
                precioMinimo: this.data.precioMinimo,
                precioPromedio: this.data.precioPromedio,
                numeroAsientos: this.data.numeroAsientos,
                idConductor: this.data.idConductor,
                idRutas: this.data.idRutas,
                fechaSalida: formatDate(
                    this.data.fechaSalida,
                    'yyyy-MM-dd',
                    'en',
                ),
                fechaLlegada: formatDate(
                    this.data.fechaLlegada,
                    'yyyy-MM-dd',
                    'en',
                ),
            });
        }
    }

    onSubmit() {
        if (this.busesForm.valid) {
            const formValue = this.busesForm.value;

            if (this.data) {
                this.busesService
                    .updateBuses(this.data.idBuses as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetBusesForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.busesService.createBuses(formValue).subscribe({
                    next: () => {
                        this.resetBusesForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.busesForm.markAllAsTouched();
        }
    }

    resetBusesForm() {
        this.busesForm.reset();
        this.onClose();
    }
}
