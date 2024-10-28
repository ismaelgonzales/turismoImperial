import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRutass } from '../models/rutas-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseURL = 'https://www.turismoimperial.somee.com/api/Rutas';
    constructor(private _htttpCliente: HttpClient) {}

    public getAllRutas(): Observable<IRutass[]> {
        return this._htttpCliente.get<IRutass[]>(this.baseURL);
    }

    public getRutasById(id: number): Observable<IRutass> {
        return this._htttpCliente.get<IRutass>(`${this.baseURL}/${id}Rutas`);
    }
}
