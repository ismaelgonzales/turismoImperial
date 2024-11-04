import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IVenta } from '../models/Venta';

@Injectable({
    providedIn: 'root',
})
export class VentaService {
    apiUrl = 'https://www.turismoimperial.somee.com/Venta';

    constructor(private http: HttpClient) {}

    getAllVentas(): Observable<IVenta[]> {
        return this.http.get<IVenta[]>(`${this.apiUrl}`);
    }

    getVentas(id: number): Observable<ApiResponse<IVenta>> {
        return this.http.get<ApiResponse<IVenta>>(`${this.apiUrl}/${id}`);
    }

    createVentas(ventas: IVenta): Observable<any> {
        return this.http.post(`${this.apiUrl}`, ventas);
    }

    updateVentas(id: number, ventas: IVenta): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, ventas);
    }

    deleteVentas(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }

    obtenerVentas(): Observable<IVenta[]> {
        return this.http.get<IVenta[]>(this.apiUrl);
    }
}
