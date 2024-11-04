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
import { ParadasService } from '../../../services/paradas.service';
import { IParadas } from '../../Paradas';

@Component({
    selector: 'app-paradas-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './paradas-form.component.html',
    styleUrl: './paradas-form.component.scss',
})
export class ParadasFormComponent implements OnChanges {
    @Input() data: IParadas | null = null;
    @Output() onCloseModel = new EventEmitter();

    paradasForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private paradasService: ParadasService,
        private toastr: ToastrService,
    ) {
        this.paradasForm = this.fb.group({
            idViaje: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            nombreCiudad: new FormControl('', [Validators.required]),
            fecha: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.paradasForm.patchValue({
                idViaje: this.data.idViaje,
                direccion: this.data.direccion,
                nombreCiudad: this.data.nombreCiudad,
                fecha: formatDate(this.data.fecha, 'yyyy-MM-dd', 'en'),
                estado: this.data.estado,
            });
        }
    }

    onSubmit() {
        if (this.paradasForm.valid) {
            const formValue = this.paradasForm.value;

            if (this.data) {
                this.paradasService
                    .updateParadas(this.data.idParadas as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetParadasForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.paradasService.createParadas(formValue).subscribe({
                    next: () => {
                        this.resetParadasForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear el viaje');
                    },
                });
            }
        } else {
            this.paradasForm.markAllAsTouched();
        }
    }

    resetParadasForm() {
        this.paradasForm.reset();
        this.onClose();
    }
}
