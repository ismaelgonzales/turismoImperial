import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'https://localhost:7216/Usuario';

    constructor(private http: HttpClient) {}

    // Método para registrar un usuario
    register(userData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.apiUrl}/register`, userData, { headers });
    }

    // Método para autenticar (iniciar sesión)
    login(credentials: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
    }
}
