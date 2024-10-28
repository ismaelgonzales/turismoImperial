import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IRutas } from '../models/Rutas';

@Injectable({
    providedIn: 'root',
})
export class RutasService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Rutas';

    constructor(private http: HttpClient) {}

    getAllRutas(): Observable<IRutas[]> {
        return this.http.get<IRutas[]>(`${this.apiUrl}`);
    }

    getRutas(id: number): Observable<ApiResponse<IRutas>> {
        return this.http.get<ApiResponse<IRutas>>(`${this.apiUrl}/${id}`);
    }

    createRutas(rutas: IRutas): Observable<any> {
        return this.http.post(`${this.apiUrl}`, rutas);
    }

    updateRutas(id: number, rutas: IRutas): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, rutas);
    }

    deleteRutas(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
