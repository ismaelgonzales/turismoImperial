import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private apiUrl = 'https://www.turismoimperial.somee.com/api';
    private Url = 'https://www.turismoimperial.somee.com';

    constructor(private http: HttpClient) {}

    getClientesCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/Cliente/`);
    }

    getBusesCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/Buses`);
    }

    getVentasCount(): Observable<number> {
        return this.http.get<number>(`${this.Url}/Venta`);
    }

    getRutasCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/Rutas`);
    }
}
