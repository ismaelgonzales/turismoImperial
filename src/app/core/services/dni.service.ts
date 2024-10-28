import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DniService {
    private apiUrl = 'https://apiperu.dev/api/dni/'; 
    private token = 'b10bf73294e48fdf7eefa4bea6a9c3d2ae8e7aa2774dc4f2a531600db11693a3';

    constructor(private http: HttpClient) {}

    obtenerDatosPorDni(dni: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });

        return this.http.get<any>(`${this.apiUrl}${dni}`, { headers });
    }
}
