import { Component, OnInit } from '@angular/core';
import { IReportes } from '../../../models/Reportes';
import { ReportesFormComponent } from '../../../models/pages/reportes-form/reportes-form.component';
import { ModelComponent } from '../../../models/pages/shared/ui/model/model.component';
import Swal from 'sweetalert2';
import { ReportesService } from '../../../services/reportes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reportes',
    standalone: true,
    imports: [ModelComponent, ReportesFormComponent],
    templateUrl: './reportes.component.html',
    styleUrl: './reportes.component.scss',
})
export class ReportesComponent implements OnInit {
    isModelOpen = false;
    reportes: IReportes[] = [];
    reporte!: IReportes;

    constructor(
        private reportesService: ReportesService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getAllReportes();
    }

    getAllReportes() {
        this.reportesService.getAllReportes().subscribe({
            next: response => {
                if (response) {
                    this.reportes = response;
                }
            },
        });
    }

    loadReportes(reportes: IReportes) {
        this.reporte = reportes;
        this.openModel();
    }

    deleteReportes(id: number) {
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
                this.reportesService.deleteReportes(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El reporte se ha eliminado correctamente.',
                            icon: 'success',
                        });
                        this.getAllReportes();
                    },
                    error: () => {
                        this.toastr.error('Error al eliminar el reporte');
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
        this.getAllReportes();
    }
}
