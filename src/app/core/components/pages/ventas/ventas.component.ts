import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentasService } from '../../../services/ventas.service';
import Ventas from '../../../models/Ventas';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-ventas',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './ventas.component.html',
    styleUrl: './ventas.component.scss',
})
export class VentasComponent implements OnInit {
    ventasForm: FormGroup;
    ventasList: Ventas[] = [];

    constructor(private fb: FormBuilder, private ventasService: VentasService) {
        this.ventasForm = this.fb.group({
            email: ['', Validators.required],
            numerotel: ['', Validators.required],
            tipodoc: ['', Validators.required],
            ruc: ['', Validators.required],
            razonsocial: ['', Validators.required],
            direccion: ['', Validators.required],
            total: [0, Validators.required],
        });
    }

    ngOnInit(): void {
        this.getVentas();
    }

    // Obtener todas las ventas
    getVentas(): void {
        this.ventasService.getVentas().subscribe(ventas => {
            this.ventasList = ventas;
        });
    }

    // Agregar nueva venta
    addVenta(): void {
        if (this.ventasForm.valid) {
            const venta = this.ventasForm.value as Ventas;
            this.ventasService.addVenta(venta).then(() => {
                this.ventasForm.reset();
                this.getVentas();
            });
        }
    }

    // Actualizar venta
    updateVenta(venta: Ventas): void {
        this.ventasForm.patchValue(venta);
    }

    // Guardar cambios de una venta
    // saveVenta(): void {
    //     if (this.ventasForm.valid) {
    //         const venta = this.ventasForm.value as Ventas;
    //         this.ventasService.updateVenta(venta).then(() => {
    //             this.ventasForm.reset();
    //             this.getVentas();
    //         });
    //     }
    // }

    // Eliminar venta
    deleteVenta(ventaId: string): void {
        this.ventasService.deleteVenta(ventaId).then(() => {
            this.getVentas();
        });
    }
}
