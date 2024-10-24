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

    // rutasListas: IRutas[] = [];
    // rutasFiltradas: IRutas[] = [];
    // filterPost: string = ''; // Asegúrate de que está definido
    // fechaSeleccionada: string = ''; // Asegúrate de que está definido

    // ngOnInit(): void {
    //     this.obtenerRutas().subscribe((data: IRutas[]) => {
    //         this.rutasListas = data;
    //         this.rutasFiltradas = data; // Inicialmente mostramos todas las rutas
    //     });
    // }

    // obtenerRutas(): Observable<IRutas[]> {
    //     return of(RUTAS_MOCK); // Simula la obtención de rutas desde un mock
    // }

    // onFechaSeleccionada(event: any): void {
    //     this.fechaSeleccionada = event.target.value; // Captura la fecha seleccionada en formato 'YYYY-MM-DD'
    //     this.filtrarRutas(); // Filtra las rutas cada vez que se selecciona una fecha
    // }

    // filtrarRutas(): void {
    //     this.rutasFiltradas = this.rutasListas.filter(ruta => {
    //         const matchesText = this.filterPost
    //             ? ruta.ciudadOrigen
    //                   .toLowerCase()
    //                   .includes(this.filterPost.toLowerCase())
    //             : true;
    //         const fechaRuta = ruta.fechaSalida?.split('T')[0]; // Obtén solo la fecha sin la hora
    //         const matchesDate = this.fechaSeleccionada
    //             ? fechaRuta === this.fechaSeleccionada
    //             : true;
    //         return matchesText && matchesDate;
    //     });
    // }
}
