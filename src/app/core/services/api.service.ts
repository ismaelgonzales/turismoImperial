// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { IBusesDetalles, IRutas, IBuses } from '../models/swagger-model';

// @Injectable({
//     providedIn: 'root',
// })
// export class ApiService {
//     private baseURL = 'https://www.turismoimperial.somee.com/api';

//     constructor(private _htttpCliente: HttpClient) { }

//     public getAllBusesDetalles(): Observable<IBusesDetalles[]> {
//         return this._htttpCliente.get<IBusesDetalles[]>(`${this.baseURL}/BusesDetalles`);
//     }

//     public getBusesDetallesById(id: number): Observable<IBusesDetalles> {
//         return this._htttpCliente.get<IBusesDetalles>(`${this.baseURL}/${id}Viajes`);
//     }

//     public getRutasById(id: number): Observable<IRutas> {
//         return this._htttpCliente.get<IRutas>(`${this.baseURL}/${id}Rutas`);
//     }

//     public getBusesById(id: number): Observable<IBuses> {
//         return this._htttpCliente.get<IBuses>(`${this.baseURL}/${id}Buses`);
//     }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    IBusesDetalles,
    IAsientoResponse,
    IStrapiResponse,
    IAsiento,
} from '../models/strapi-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseURL = 'https://fruitful-broccoli-60c7faeb3a.strapiapp.com/api/';

    constructor(private _httpCliente: HttpClient) {}

    // Obtener todos los detalles de los buses
    public getAllBusesDetalles(): Observable<IBusesDetalles[]> {
        return this._httpCliente
            .get<IStrapiResponse<IBusesDetalles>>(
                `${this.baseURL}buses-detalles`,
            )
            .pipe(map(response => response.data));
    }

    // Obtener los asientos filtrados por documentId
    public getAsientosByDocumentId(documentId: string): Observable<IAsiento[]> {
        return this._httpCliente
            .get<IAsientoResponse>(
                `${this.baseURL}asientos?filters[buses_detalle][documentId][$eq]=${documentId}&pagination[page]=1&pagination[pageSize]=50`,
            )
            .pipe(
                map(response => {
                    return response.data; // Retorna solo el array de asientos
                }),
            );
    }
}
