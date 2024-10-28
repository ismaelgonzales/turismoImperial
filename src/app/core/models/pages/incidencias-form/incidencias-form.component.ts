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
import { IIncidencias } from '../../Incidencias';
import { IncidenciasService } from '../../../services/incidencias.service';

@Component({
    selector: 'app-incidencias-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './incidencias-form.component.html',
    styleUrl: './incidencias-form.component.scss',
})
export class IncidenciasFormComponent implements OnChanges {
    @Input() data: IIncidencias | null = null;
    @Output() onCloseModel = new EventEmitter();

    incidenciasForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private incidenciasService: IncidenciasService,
        private toastr: ToastrService,
    ) {
        this.incidenciasForm = this.fb.group({
            idBus: new FormControl('', [Validators.required]),
            idViaje: new FormControl('', [Validators.required]),
            descripcion: new FormControl('', [Validators.required]),

            fecha: new FormControl('', [Validators.required]),
            fechaRegistro: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.incidenciasForm.patchValue({
                idBus: this.data.idBus,
                idViaje: this.data.idViaje,
                descripcion: this.data.descripcion,
                fecha: formatDate(this.data.fecha, 'yyyy-MM-dd', 'en'),
                fechaRegistro: formatDate(
                    this.data.fechaRegistro,
                    'yyyy-MM-dd',
                    'en',
                ),
            });
        }
    }

    onSubmit() {
        if (this.incidenciasForm.valid) {
            const formValue = this.incidenciasForm.value;

            if (this.data) {
                this.incidenciasService
                    .updateIncidencias(
                        this.data.incidenciaId as number,
                        formValue,
                    )
                    .subscribe({
                        next: () => {
                            this.resetIncidenciasForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.incidenciasService.createIncidencias(formValue).subscribe({
                    next: () => {
                        this.resetIncidenciasForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.incidenciasForm.markAllAsTouched();
        }
    }

    resetIncidenciasForm() {
        this.incidenciasForm.reset();
        this.onClose();
    }
}
