import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DniService {
    private apiUrl = 'https://apiperu.dev/api/dni/'; 
    private token = '25222079ce57429371cf6d908d8b283966aad65f8e64caf50c2fff09a5727ce6';

    constructor(private http: HttpClient) {}

    obtenerDatosPorDni(dni: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });

        return this.http.get<any>(`${this.apiUrl}${dni}`, { headers });
    }
}
