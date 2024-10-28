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

import { IRutas } from '../../Rutas';
import { RutasService } from '../../../services/rutas.service';

@Component({
    selector: 'app-rutas-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './rutas-form.component.html',
    styleUrl: './rutas-form.component.scss',
})
export class RutasFormComponent implements OnChanges {
    @Input() data: IRutas | null = null;
    @Output() onCloseModel = new EventEmitter();

    rutasForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private rutasService: RutasService,
        private toastr: ToastrService,
    ) {
        this.rutasForm = this.fb.group({
            ciudadOrigen: new FormControl('', [Validators.required]),
            ciudadId: new FormControl('', [Validators.required]),
            ciudadSeoId: new FormControl('', [Validators.required]),
            ciudadDestino: new FormControl('', [Validators.required]),
            destinoId: new FormControl('', [Validators.required]),
            destinoSeoId: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.rutasForm.patchValue({
                ciudadOrigen: this.data.ciudadOrigen,
                ciudadId: this.data.ciudadId,
                ciudadSeoId: this.data.ciudadSeoId,
                ciudadDestino: this.data.ciudadDestino,
                destinoId: this.data.destinoId,
                destinoSeoId: this.data.destinoSeoId,
            });
        }
    }

    onSubmit() {
        if (this.rutasForm.valid) {
            const formValue = this.rutasForm.value;

            if (this.data) {
                this.rutasService
                    .updateRutas(this.data.idRutas as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetRutasForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.rutasService.createRutas(formValue).subscribe({
                    next: () => {
                        this.resetRutasForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.rutasForm.markAllAsTouched();
        }
    }

    resetRutasForm() {
        this.rutasForm.reset();
        this.onClose();
    }
}
