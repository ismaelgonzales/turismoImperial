import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { ApiResponse, IVehiculo } from '../../Vehiculo';
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
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
    selector: 'app-vehiculos-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './vehiculos-form.component.html',
    styleUrl: './vehiculos-form.component.scss',
})
export class VehiculosFormComponent implements OnChanges {
    @Input() data: IVehiculo | null = null;
    @Output() onCloseModel = new EventEmitter();

    vehiculosForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private vehiculoService: VehiculoService,
        private toastr: ToastrService,
    ) {
        this.vehiculosForm = this.fb.group({
            matricula: new FormControl('', [Validators.required]),
            marcaModelo: new FormControl('', [Validators.required]),
            numeroAsientos: new FormControl('', [Validators.required]),
            estadoVehiculo: new FormControl('', [Validators.required]),
        });
    }

    // idVehiculo: number;
    // matricula: string;
    // marcaModelo: string;
    // numeroAsientos: number;
    // estadoVehiculo: string;

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.vehiculosForm.patchValue({
                matricula: this.data.matricula,
                marcaModelo: this.data.marcaModelo,
                numeroAsientos: this.data.numeroAsientos,
                estadoVehiculo: this.data.estadoVehiculo,
            });
        }
    }

    onSubmit() {
        if (this.vehiculosForm.valid) {
            const formValue = this.vehiculosForm.value;

            if (this.data) {
                this.vehiculoService
                    .updateVehiculos(this.data.idVehiculo as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetVehiculosForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.vehiculoService.createVehiculos(formValue).subscribe({
                    next: () => {
                        this.resetVehiculosForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el vehiculo');
                    },
                });
            }
        } else {
            this.vehiculosForm.markAllAsTouched();
        }
    }

    resetVehiculosForm() {
        this.vehiculosForm.reset();
        this.onClose();
    }
}
