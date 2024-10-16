import { Component, OnInit } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { SearchBarTravelComponent } from '../../organims/search-bar-travel/search-bar-travel.component';
import { DetalleRutaComponent } from '../../organims/detalle-ruta/detalle-ruta.component';

@Component({
    selector: 'app-rutas',
    standalone: true,
    imports: [
        HeaderPageComponent,
        SearchBarTravelComponent,
        DetalleRutaComponent,
    ],
    templateUrl: './rutas.component.html',
    styleUrl: './rutas.component.scss',
})
export class RutasComponent {}
