import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DniService {
    private apiUrl = 'https://apiperu.dev/api/dni/'; 
    private token = '1a3d5c02bf235b35ed6732ee8a238cd0ed78458ae47b6a34a9b78b665fd8091a';

    constructor(private http: HttpClient) {}

    obtenerDatosPorDni(dni: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });

        return this.http.get<any>(`${this.apiUrl}${dni}`, { headers });
    }
}
