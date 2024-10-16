import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRutas } from '../models/rutas-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseURL = 'https://www.turismoimperial.somee.com/api/Rutas';
    constructor(private _htttpCliente: HttpClient) {}

    public getAllRutas(): Observable<IRutas[]> {
        return this._htttpCliente.get<IRutas[]>(this.baseURL);
    }

    public getRutasById(id: number): Observable<IRutas> {
        return this._htttpCliente.get<IRutas>(`${this.baseURL}/${id}Rutas`);
    }
}
