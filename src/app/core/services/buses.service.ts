import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IBuses } from '../models/Buses';

@Injectable({
    providedIn: 'root',
})
export class BusesService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Buses';

    constructor(private http: HttpClient) {}

    getAllBuses(): Observable<IBuses[]> {
        return this.http.get<IBuses[]>(`${this.apiUrl}`);
    }

    getBuses(id: number): Observable<ApiResponse<IBuses>> {
        return this.http.get<ApiResponse<IBuses>>(`${this.apiUrl}/${id}`);
    }

    createBuses(buses: IBuses): Observable<any> {
        return this.http.post(`${this.apiUrl}`, buses);
    }

    updateBuses(id: number, buses: IBuses): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, buses);
    }

    deleteBuses(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
