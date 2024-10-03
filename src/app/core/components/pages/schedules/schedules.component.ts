import { Component, OnInit } from '@angular/core';
import { RutasBusesService } from '../../../services/rutas-buses.service';
import { TableModule } from 'primeng/table';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { ButtonComponent } from '../../molecules/button/button.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-schedules',
    standalone: true,
    imports: [
        TableModule,
        ButtonComponent,
        RouterModule,
        HeaderPageComponent,
        CommonModule,
    ],
    templateUrl: './schedules.component.html',
    styleUrl: './schedules.component.scss',

    providers: [RutasBusesService],
})
export class SchedulesComponent implements OnInit {
    // buses: any[] = []; // Arreglo para almacenar los datos obtenidos de la API

    // constructor(private busService: BusesService) {}

    // ngOnInit(): void {
    //     // Llamar al servicio para obtener los datos de los buses cuando se inicialice el componente
    //     this.busService.getBuses().subscribe({
    //         next: data => {
    //             this.buses = data; // Asignar los datos de la API a la variable 'buses'
    //             console.log(this.buses); // Verificar los datos recibidos en la consola
    //         },
    //         error: error => {
    //             console.error('Error al obtener los datos de la API', error);
    //         },
    //     });
    // }

    rutasbuses: any[] = [];
    constructor(private rutasBusesService: RutasBusesService) {}
    ngOnInit(): void {
        this.rutasBusesService.getRutasBuses().subscribe({
            next: data => {
                this.rutasbuses = data;
                console.log(this.rutasbuses);
            },
            error: error => {
                console.error('Error al obtener los datos de la API', error);
            },
        });
    }

    // rutasbuses!: RutasBuses[];

    // constructor(private rutasBusesService: RutasBusesService) {}

    // ngOnInit() {
    //     this.rutasBusesService.getRutasBuses().subscribe(data => {
    //         this.rutasbuses = data;
    //     });
    // }
}
