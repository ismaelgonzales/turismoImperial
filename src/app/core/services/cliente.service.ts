import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IClientes } from '../models/Clientes';

@Injectable({
    providedIn: 'root',
})
export class ClienteService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Cliente';

    constructor(private http: HttpClient) {}

    getAllCliente(): Observable<IClientes[]> {
        return this.http.get<IClientes[]>(`${this.apiUrl}`);
    }

    getCliente(id: number): Observable<ApiResponse<IClientes>> {
        return this.http.get<ApiResponse<IClientes>>(`${this.apiUrl}/${id}`);
    }

    createCliente(cliente: IClientes): Observable<any> {
        return this.http.post(`${this.apiUrl}`, cliente);
    }

    updateCliente(id: number, cliente: IClientes): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, cliente);
    }

    deleteCliente(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
