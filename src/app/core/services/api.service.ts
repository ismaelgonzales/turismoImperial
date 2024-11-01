import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusesDetalles, IRutas, IBuses } from '../models/swagger-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseURL = 'https://www.turismoimperial.somee.com/api';




    constructor(private _htttpCliente: HttpClient) { }

    public getAllBusesDetalles(): Observable<IBusesDetalles[]> {
        return this._htttpCliente.get<IBusesDetalles[]>(`${this.baseURL}/BusesDetalles`);
    }

    public getBusesDetallesById(id: number): Observable<IBusesDetalles> {
        return this._htttpCliente.get<IBusesDetalles>(`${this.baseURL}/${id}Viajes`);
    }

    public getRutasById(id: number): Observable<IRutas> {
        return this._htttpCliente.get<IRutas>(`${this.baseURL}/${id}Rutas`);
    }
    
    public getBusesById(id: number): Observable<IBuses> {
        return this._htttpCliente.get<IBuses>(`${this.baseURL}/${id}Buses`);
    }
}
