import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IViajes } from '../models/Viajes';

@Injectable({
    providedIn: 'root',
})
export class ViajesService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Viajes';

    constructor(private http: HttpClient) {}

    getAllViaje(): Observable<IViajes[]> {
        return this.http.get<IViajes[]>(`${this.apiUrl}`);
    }

    getViaje(id: number): Observable<ApiResponse<IViajes>> {
        return this.http.get<ApiResponse<IViajes>>(`${this.apiUrl}/${id}`);
    }

    createViaje(viajes: IViajes): Observable<any> {
        return this.http.post(`${this.apiUrl}`, viajes);
    }

    updateViaje(id: number, viajes: IViajes): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, viajes);
    }

    deleteViaje(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }

    obtenerViajes(): Observable<IViajes[]> {
        return this.http.get<IViajes[]>(this.apiUrl);
    }
}
