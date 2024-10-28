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

import { IVentas } from '../../Ventas';
import { VentaService } from '../../../services/venta.service';

@Component({
    selector: 'app-ventas-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './ventas-form.component.html',
    styleUrl: './ventas-form.component.scss',
})
export class VentasFormComponent implements OnChanges {
    @Input() data: IVentas | null = null;
    @Output() onCloseModel = new EventEmitter();

    ventasForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private ventasService: VentaService,
        private toastr: ToastrService,
    ) {
        this.ventasForm = this.fb.group({
            codigoVenta: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            idUsuario: new FormControl('', [Validators.required]),
            idReserva: new FormControl('', [Validators.required]),
            nombrePasajero: new FormControl('', [Validators.required]),
            numeroPasajes: new FormControl('', [Validators.required]),
            origen: new FormControl('', [Validators.required]),
            destino: new FormControl('', [Validators.required]),
            fechaVenta: new FormControl('', [Validators.required]),
            fechaViaje: new FormControl('', [Validators.required]),
            montoTotal: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.ventasForm.patchValue({
                codigoVenta: this.data.codigoVenta,
                idUsuario: this.data.idUsuario,
                idReserva: this.data.idReserva,
                nombrePasajero: this.data.nombrePasajero,
                numeroPasajes: this.data.numeroPasajes,
                origen: this.data.origen,
                destino: this.data.destino,
                fechaVenta: formatDate(
                    this.data.fechaVenta,
                    'yyyy-MM-dd',
                    'en',
                ),
                fechaViaje: formatDate(
                    this.data.fechaViaje,
                    'yyyy-MM-dd',
                    'en',
                ),
                montoTotal: this.data.montoTotal,
            });
        }
    }

    onSubmit() {
        if (this.ventasForm.valid) {
            const formValue = this.ventasForm.value;

            if (this.data) {
                this.ventasService
                    .updateVentas(this.data.idVenta as number, formValue)
                    .subscribe({
                        next: () => {
                            this.resetVentasForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.ventasService.createVentas(formValue).subscribe({
                    next: () => {
                        this.resetVentasForm();
                        this.toastr.success('Accion realizada con exito');
                    },
                    error: () => {
                        this.toastr.error('Error al crear la Venta');
                    },
                });
            }
        } else {
            this.ventasForm.markAllAsTouched();
        }
    }

    resetVentasForm() {
        this.ventasForm.reset();
        this.onClose();
    }
}
