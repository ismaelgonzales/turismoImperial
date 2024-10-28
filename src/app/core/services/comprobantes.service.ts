import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IFacturacion } from '../models/Facturacion';

@Injectable({
    providedIn: 'root',
})
export class ComprobantesService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Comprobantes';

    constructor(private http: HttpClient) {}

    getAllComprobantes(): Observable<IFacturacion[]> {
        return this.http.get<IFacturacion[]>(`${this.apiUrl}`);
    }

    getComprobantes(id: number): Observable<ApiResponse<IFacturacion>> {
        return this.http.get<ApiResponse<IFacturacion>>(`${this.apiUrl}/${id}`);
    }

    createComprobantes(comprobantes: IFacturacion): Observable<any> {
        return this.http.post(`${this.apiUrl}`, comprobantes);
    }

    updateComprobantes(
        id: number,
        comprobantes: IFacturacion,
    ): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, comprobantes);
    }

    deleteComprobantes(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
