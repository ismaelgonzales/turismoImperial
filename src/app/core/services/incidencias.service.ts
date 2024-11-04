import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IIncidencias } from '../models/Incidencias';

@Injectable({
    providedIn: 'root',
})
export class IncidenciasService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Incidencias';

    constructor(private http: HttpClient) {}

    getAllIncidencias(): Observable<IIncidencias[]> {
        return this.http.get<IIncidencias[]>(`${this.apiUrl}`);
    }

    getIncidencias(id: number): Observable<ApiResponse<IIncidencias>> {
        return this.http.get<ApiResponse<IIncidencias>>(`${this.apiUrl}/${id}`);
    }

    createIncidencias(incidencias: IIncidencias): Observable<any> {
        return this.http.post(`${this.apiUrl}`, incidencias);
    }

    // updateIncidencias(id: number, incidencias: IIncidencias): Observable<any> {
    //     return this.http.put<any>(`${this.apiUrl}`, incidencias);
    // }

    // updateIncidencias(
    //     id: number,
    //     incidencias: IIncidencias,
    // ): Observable<IIncidencias[]> {
    //     return this.http.put<IIncidencias[]>(
    //         `${this.apiUrl}/${id}`,
    //         incidencias,
    //     );
    // }
    updateIncidencias(id: number, incidencias: IIncidencias): Observable<void> {
        return this.http.put<void>(
            `${this.apiUrl}${this.apiUrl}${id}`,
            incidencias,
        );
    }

    // updateIncidencias(body: IIncidencias): Observable<IIncidencias> {
    //     return this.http.put<IIncidencias>(
    //         'https://www.turismoimperial.somee.com/api/Incidencias',
    //         body,
    //     );
    // }

    deleteIncidencias(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
