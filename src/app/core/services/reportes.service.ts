import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IReportes } from '../models/Reportes';

@Injectable({
    providedIn: 'root',
})
export class ReportesService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Opiniones';

    constructor(private http: HttpClient) {}

    getAllReportes(): Observable<IReportes[]> {
        return this.http.get<IReportes[]>(`${this.apiUrl}`);
    }

    getReportes(id: number): Observable<ApiResponse<IReportes>> {
        return this.http.get<ApiResponse<IReportes>>(`${this.apiUrl}/${id}`);
    }

    createReportes(reportes: IReportes): Observable<any> {
        return this.http.post(`${this.apiUrl}`, reportes);
    }

    updateReportes(id: number, reportes: IReportes): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, reportes);
    }

    deleteReportes(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
