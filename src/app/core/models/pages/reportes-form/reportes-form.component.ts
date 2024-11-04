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
import { IReportes } from '../../Reportes';
import { ReportesService } from '../../../services/reportes.service';

@Component({
    selector: 'app-reportes-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './reportes-form.component.html',
    styleUrl: './reportes-form.component.scss',
})
export class ReportesFormComponent implements OnChanges {
    @Input() data: IReportes | null = null;
    @Output() onCloseModel = new EventEmitter();

    reportesForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private reportesService: ReportesService,
        private toastr: ToastrService,
    ) {
        this.reportesForm = this.fb.group({
            idUsuario: new FormControl('', [Validators.required]),
            idRutas: new FormControl('', [Validators.required]),
            comentarios: new FormControl('', [Validators.required]),
            calificacion: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required]),
            fechaOpinion: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.reportesForm.patchValue({
                idUsuario: this.data.idUsuario,
                idRutas: this.data.idRutas,
                comentarios: this.data.comentarios,
                calificacion: this.data.calificacion,
                estado: this.data.estado,
                fechaOpinion: formatDate(
                    this.data.fechaOpinion,
                    'yyyy-MM-dd',
                    'en',
                ),
            });
        }
    }

    onSubmit() {
        if (this.reportesForm.valid) {
            const formValue = this.reportesForm.value;

            if (this.data) {
                this.reportesService
                    .updateReportes(this.data.idOpinion as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetReportesForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.reportesService.createReportes(formValue).subscribe({
                    next: () => {
                        this.resetReportesForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.reportesForm.markAllAsTouched();
        }
    }

    resetReportesForm() {
        this.reportesForm.reset();
        this.onClose();
    }
}
