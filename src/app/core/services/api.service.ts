import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBusesDetalles, IStrapiResponse } from '../models/strapi-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseURL = 'https://fruitful-broccoli-60c7faeb3a.strapiapp.com/api/';
    // private baseURL = 'https://www.turismoimperial.somee.com/api';
    



    constructor(private _httpCliente: HttpClient) { }

    public getAllBusesDetalles(): Observable<IBusesDetalles[]> {
        return this._httpCliente.get<IStrapiResponse<IBusesDetalles>>(`${this.baseURL}buses-detalles`)
            .pipe(
                map(response => response.data) // Extrae solo el array de datos
            );

    // public getBusesDetallesById(id: number): Observable<IBusesDetalles> {
    //     return this._htttpCliente.get<IBusesDetalles>(`${this.baseURL}/${id}Viajes`);
    // }

    // public getRutasById(id: number): Observable<IRutas> {
    //     return this._htttpCliente.get<IRutas>(`${this.baseURL}/${id}Rutas`);
    // }
    
    // public getBusesById(id: number): Observable<IBuses> {
    //     return this._htttpCliente.get<IBuses>(`${this.baseURL}/${id}Buses`);
    // }
}}
