import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IVentas } from '../models/Ventas';

@Injectable({
    providedIn: 'root',
})
export class VentaService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Venta';

    constructor(private http: HttpClient) {}

    getAllVentas(): Observable<IVentas[]> {
        return this.http.get<IVentas[]>(`${this.apiUrl}`);
    }

    getVentas(id: number): Observable<ApiResponse<IVentas>> {
        return this.http.get<ApiResponse<IVentas>>(`${this.apiUrl}/${id}`);
    }

    createVentas(ventas: IVentas): Observable<any> {
        return this.http.post(`${this.apiUrl}`, ventas);
    }

    updateVentas(id: number, ventas: IVentas): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, ventas);
    }

    deleteVentas(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
