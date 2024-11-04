import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IParadas } from '../models/Paradas';

@Injectable({
    providedIn: 'root',
})
export class ParadasService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Paradas';

    constructor(private http: HttpClient) {}

    getAllParadas(): Observable<IParadas[]> {
        return this.http.get<IParadas[]>(`${this.apiUrl}`);
    }

    getParadas(id: number): Observable<ApiResponse<IParadas>> {
        return this.http.get<ApiResponse<IParadas>>(`${this.apiUrl}/${id}`);
    }

    createParadas(paradas: IParadas): Observable<any> {
        return this.http.post(`${this.apiUrl}`, paradas);
    }

    updateParadas(id: number, paradas: IParadas): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, paradas);
    }

    deleteParadas(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
