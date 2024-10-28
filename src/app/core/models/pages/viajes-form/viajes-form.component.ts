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

@Component({
    selector: 'app-viajes-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './viajes-form.component.html',
    styleUrls: ['./viajes-form.component.scss'],
})
export class ViajesFormComponent implements OnChanges {
    @Input() data: IViajes | null = null;
    @Output() onCloseModel = new EventEmitter();

    viajesForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private viajesService: ViajesService,
        private toastr: ToastrService,
    ) {
        this.viajesForm = this.fb.group({
            servicio: new FormControl('', [Validators.required]),
            precioMinimo: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            idBus: new FormControl('', [Validators.required]),
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
            this.viajesForm.patchValue({
                servicio: this.data.servicio,
                precioMinimo: this.data.precioMinimo,
                idBus: this.data.idBus,
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
        if (this.viajesForm.valid) {
            const formValue = this.viajesForm.value;

            if (this.data) {
                this.viajesService
                    .updateViaje(this.data.idViajes as number, formValue)
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
                this.viajesService.createViaje(formValue).subscribe({
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
            this.viajesForm.markAllAsTouched();
        }
    }

    resetViajesForm() {
        this.viajesForm.reset();
        this.onClose();
    }
}
