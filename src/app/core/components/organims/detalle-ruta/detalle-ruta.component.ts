import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IRutas } from '../../../models/rutas-model';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-detalle-ruta',
    standalone: true,
    imports: [NgFor, RouterModule, RouterLink, FormsModule],
    templateUrl: './detalle-ruta.component.html',
    styleUrls: ['./detalle-ruta.component.scss'],
})
export class DetalleRutaComponent implements OnInit {
    @Input() provinciaSalida: string = '';
    @Input() provinciaLlegada: string = '';
    @Input() horaSalida: string = '';
    @Input() precio: number = 0;

    rutasListas: IRutas[] = [];
    rutasFiltradas: IRutas[] = []; // Lista filtrada para mostrar en la vista
    filterPost: string = ''; // Almacena el texto del filtro
    fechaSeleccionada: string = ''; // Almacena la fecha seleccionada
    ciudadOrigen: string = ''; // Para almacenar la ciudad seleccionada
    destino: string = ''; // Para almacenar la ciudad de destino

    constructor(private _apiService: ApiService) {}

    ngOnInit(): void {
        // Obtiene las rutas desde la API
        this._apiService.getAllRutas().subscribe((data: IRutas[]) => {
            this.rutasListas = data;
            this.rutasFiltradas = data; // Inicializamos con todas las rutas
        });
    }

    // Método para filtrar las rutas por texto y fecha
    filtrarRutas(): void {
        this.rutasFiltradas = this.rutasListas.filter(ruta => {
            const matchesText = this.filterPost
                ? ruta.ciudadOrigen.toLowerCase().includes(this.filterPost.toLowerCase())
                : true;

            const fechaRuta = ruta.fechaSalida?.split('T')[0]; // Extrae solo la fecha sin la hora
            const matchesDate = this.fechaSeleccionada
                ? fechaRuta === this.fechaSeleccionada
                : true;

            const matchesOrigin = this.ciudadOrigen
                ? ruta.ciudadOrigen.toLowerCase() === this.ciudadOrigen.toLowerCase()
                : true;

            return matchesText && matchesDate && matchesOrigin;
        });
    }

    // Actualiza el destino según la ciudad seleccionada
    actualizarDestino(): void {
        this.destino = this.ciudadOrigen === 'Lima' ? 'Tarma' : this.ciudadOrigen === 'Tarma' ? 'Lima' : '';
        this.filtrarRutas(); // Aplica el filtro cada vez que se actualiza el destino
    }

    // Actualiza la fecha seleccionada y aplica el filtro
    onFechaSeleccionada(event: any): void {
        this.fechaSeleccionada = event.target.value; // Captura la fecha en formato 'YYYY-MM-DD'
        this.filtrarRutas(); // Aplica el filtro
    }

    // Actualiza el filtro de texto y aplica el filtro
    onTextoFiltrado(): void {
        this.filtrarRutas(); // Aplica el filtro cada vez que cambia el texto
    }
}
