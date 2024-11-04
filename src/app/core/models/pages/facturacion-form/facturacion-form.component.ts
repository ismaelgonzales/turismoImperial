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
import { IFacturacion } from '../../Facturacion';
import { ComprobantesService } from '../../../services/comprobantes.service';

@Component({
    selector: 'app-facturacion-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './facturacion-form.component.html',
    styleUrl: './facturacion-form.component.scss',
})
export class FacturacionFormComponent implements OnChanges {
    @Input() data: IFacturacion | null = null;
    @Output() onCloseModel = new EventEmitter();

    comprobantesForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private comprobantesService: ComprobantesService,
        private toastr: ToastrService,
    ) {
        this.comprobantesForm = this.fb.group({
            idCliente: new FormControl('', [Validators.required]),
            idEmpleados: new FormControl('', [Validators.required]),
            numeroComprobante: new FormControl('', [Validators.required]),
            tipoComprobante: new FormControl('', [Validators.required]),
            fechaEmision: new FormControl('', [Validators.required]),
            montoTotal: new FormControl('', [Validators.required]),
            idPagos: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required]),
        });
    }

    onClose() {
        this.onCloseModel.emit(false);
    }

    ngOnChanges(): void {
        console.log('Datos recibidos:', this.data);
        if (this.data) {
            this.comprobantesForm.patchValue({
                idCliente: this.data.idCliente,
                idEmpleados: this.data.idEmpleados,
                numeroComprobante: this.data.numeroComprobante,
                tipoComprobante: this.data.tipoComprobante,

                fechaEmision: formatDate(
                    this.data.fechaEmision,
                    'yyyy-MM-dd',
                    'en',
                ),
                montoTotal: this.data.montoTotal,
                idPagos: this.data.idPagos,
                estado: this.data.estado,
            });
        }
    }

    onSubmit() {
        if (this.comprobantesForm.valid) {
            const formValue = this.comprobantesForm.value;

            if (this.data) {
                this.comprobantesService
                    .updateComprobantes(
                        this.data.idComprobante as number,
                        formValue,
                    )
                    .subscribe({
                        next: () => {
                            this.resetComprobantesForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al actualizar el viaje');
                        },
                    });
            } else {
                this.comprobantesService
                    .createComprobantes(formValue)
                    .subscribe({
                        next: () => {
                            this.resetComprobantesForm();
                            this.toastr.success('Accion realizada con exito');
                        },
                        error: () => {
                            this.toastr.error('Error al crear el viaje');
                        },
                    });
            }
        } else {
            this.comprobantesForm.markAllAsTouched();
        }
    }

    resetComprobantesForm() {
        this.comprobantesForm.reset();
        this.onClose();
    }
}
