import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { IVentas } from '../../../models/Ventas';
import { VentaService } from '../../../services/venta.service';
import { VentasFormComponent } from '../../../models/pages/ventas-form/ventas-form.component';

@Component({
    selector: 'app-venta',
    standalone: true,
    imports: [ModelComponent, VentasFormComponent],
    templateUrl: './venta.component.html',
    styleUrl: './venta.component.scss',
})
export class VentaComponent implements OnInit {
    isModelOpen = false;
    ventas: IVentas[] = [];
    venta!: IVentas;

    constructor(
        private ventasService: VentaService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllVentas();
    }

    getAllVentas() {
        this.ventasService.getAllVentas().subscribe({
            next: response => {
                if (response) {
                    this.ventas = response;
                }
            },
        });
    }

    loadVentas(ventas: IVentas) {
        this.venta = ventas;
        this.openModel();
    }

    deleteVentas(id: number) {
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
                this.ventasService.deleteVentas(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'La venta se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllVentas();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar la venta');
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
        this.getAllVentas();
    }
}
