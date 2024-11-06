import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IConductores } from '../models/Conductores';

@Injectable({
    providedIn: 'root',
})
export class ConductorService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Conductor';

    constructor(private http: HttpClient) {}

    getAllConductores(): Observable<IConductores[]> {
        return this.http.get<IConductores[]>(`${this.apiUrl}`);
    }

    getConductores(id: number): Observable<ApiResponse<IConductores>> {
        return this.http.get<ApiResponse<IConductores>>(`${this.apiUrl}/${id}`);
    }

    createConductores(conductores: IConductores): Observable<any> {
        return this.http.post(`${this.apiUrl}`, conductores);
    }

    updateConductores(
        id: number,
        conductores: IConductores,
    ): Observable<IConductores> {
        return this.http.put<IConductores>(`${this.apiUrl}/${id}`, conductores);
    }

    deleteConductores(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
