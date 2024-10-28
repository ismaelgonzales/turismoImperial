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
import { IConductores } from '../../Conductores';
import { ConductorService } from '../../../services/conductor.service';

@Component({
    selector: 'app-conductores-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './conductores-form.component.html',
    styleUrl: './conductores-form.component.scss',
})
export class ConductoresFormComponent implements OnChanges {
    @Input() data: IConductores | null = null;
    @Output() onCloseModel = new EventEmitter();

    conductoresForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private conductoresService: ConductorService,
        private toastr: ToastrService,
    ) {
        this.conductoresForm = this.fb.group({
            nombre: new FormControl('', [Validators.required]),
            apellidos: new FormControl('', [Validators.required]),
            numeroLicencia: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            fechaNacimiento: new FormControl('', [Validators.required]),
            telefono: new FormControl('', [Validators.required]),
            fechaContratacion: new FormControl('', [Validators.required]),
            estadoConductor: new FormControl('', [Validators.required]),
            idVehiculo: new FormControl('', [Validators.required]),
            fechaRegistro: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.conductoresForm.patchValue({
                nombre: this.data.nombre,
                apellidos: this.data.apellidos,
                numeroLicencia: this.data.numeroLicencia,
                fechaNacimiento: formatDate(
                    this.data.fechaNacimiento,
                    'yyyy-MM-dd',
                    'en',
                ),
                telefono: this.data.telefono,
                fechaContratacion: formatDate(
                    this.data.fechaContratacion,
                    'yyyy-MM-dd',
                    'en',
                ),
                estadoConductor: this.data.estadoConductor,
                idVehiculo: this.data.idVehiculo,
                fechaRegistro: formatDate(
                    this.data.fechaRegistro,
                    'yyyy-MM-dd',
                    'en',
                ),
            });
        }
    }

    onSubmit() {
        if (this.conductoresForm.valid) {
            const formValue = this.conductoresForm.value;

            if (this.data) {
                this.conductoresService
                    .updateConductores(
                        this.data.idConductor as number,
                        formValue,
                    )
                    .subscribe({
                        next: () => {
                            this.resetConductoresForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.conductoresService.createConductores(formValue).subscribe({
                    next: () => {
                        this.resetConductoresForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.conductoresForm.markAllAsTouched();
        }
    }

    resetConductoresForm() {
        this.conductoresForm.reset();
        this.onClose();
    }
}
