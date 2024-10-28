import { Component, OnInit } from '@angular/core';
import { IFacturacion } from '../../../models/Facturacion';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import { FacturacionFormComponent } from '../../../models/pages/facturacion-form/facturacion-form.component';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-facturacion',
    standalone: true,
    imports: [ModelComponent, FacturacionFormComponent],
    templateUrl: './facturacion.component.html',
    styleUrl: './facturacion.component.scss',
})
export class FacturacionComponent implements OnInit {
    isModelOpen = false;
    comprobantes: IFacturacion[] = [];
    comprobante!: IFacturacion;

    constructor(
        private comprobantesService: ComprobantesService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllComprobantes();
    }

    getAllComprobantes() {
        this.comprobantesService.getAllComprobantes().subscribe({
            next: response => {
                if (response) {
                    this.comprobantes = response;
                }
            },
        });
    }

    loadComprobantes(comprobantes: IFacturacion) {
        this.comprobante = comprobantes;
        this.openModel();
    }

    deleteComprobantes(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Esta acción no se puede deshacer!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.isConfirmed) {
                this.comprobantesService.deleteComprobantes(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El comprobante se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllComprobantes();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el comprobante');
                    },
                });
            }
        });
    }

    openModel() {
        this.isModelOpen = true;
    }

    closeModel() {
        this.isModelOpen = false;
        this.getAllComprobantes();
    }
}
