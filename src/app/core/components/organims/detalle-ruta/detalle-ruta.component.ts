import { NgFor } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { IRutas } from '../../../models/rutas-model';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-detalle-ruta',
    standalone: true,
    imports: [NgFor, RouterModule, RouterLink],
    templateUrl: './detalle-ruta.component.html',
    styleUrl: './detalle-ruta.component.scss',
})
export class DetalleRutaComponent implements OnInit {
    @Input() provinciaSalida: string = '';
    @Input() provinciaLlegada: string = '';
    @Input() horaSalida: string = '';
    @Input() precio: number = 0;

    rutasListas: IRutas[] = [];
    constructor(private _apiService: ApiService) {}
    ngOnInit(): void {
        this._apiService.getAllRutas().subscribe((data: IRutas[]) => {
            this.rutasListas = data;
        });
    }
}
