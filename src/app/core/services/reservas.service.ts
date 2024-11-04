import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IReservas } from '../models/Reservas';

@Injectable({
    providedIn: 'root',
})
export class ReservasService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Reserva';

    constructor(private http: HttpClient) {}

    getAllReservas(): Observable<IReservas[]> {
        return this.http.get<IReservas[]>(`${this.apiUrl}`);
    }

    getReservas(id: number): Observable<ApiResponse<IReservas>> {
        return this.http.get<ApiResponse<IReservas>>(`${this.apiUrl}/${id}`);
    }

    createReservas(reservas: IReservas): Observable<any> {
        return this.http.post(`${this.apiUrl}`, reservas);
    }

    updateReservas(id: number, reservas: IReservas): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, reservas);
    }

    deleteReservas(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
