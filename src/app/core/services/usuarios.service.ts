import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IUsuario } from '../models/Usuario';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Usuario';

    constructor(private http: HttpClient) {}

    getAllUsuarios(): Observable<IUsuario[]> {
        return this.http.get<IUsuario[]>(`${this.apiUrl}`);
    }

    getUsuarios(id: number): Observable<ApiResponse<IUsuario>> {
        return this.http.get<ApiResponse<IUsuario>>(`${this.apiUrl}/${id}`);
    }

    createUsuarios(usuarios: IUsuario): Observable<any> {
        return this.http.post(`${this.apiUrl}`, usuarios);
    }

    updateUsuarios(id: number, usuarios: IUsuario): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, usuarios);
    }

    deleteUsuarios(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
