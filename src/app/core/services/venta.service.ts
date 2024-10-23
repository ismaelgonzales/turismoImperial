import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/Venta.interface';

@Injectable({
    providedIn: 'root',
})
export class VentaService {
    private apiUrl: string = 'https://www.turismoimperial.somee.com/api/Venta';

    constructor(private http: HttpClient) {}

    getList(): Observable<Venta[]> {
        return this.http.get<Venta[]>(`${this.apiUrl}`);
    }

    add(request: Venta): Observable<Venta> {
        return this.http.post<Venta>(`${this.apiUrl}/Agregar`, request);
    }

    updateVenta(id: number, ruta: Venta): Observable<Venta> {
        return this.http.put<Venta>(`${this.apiUrl}/Actualizar/${id}`, ruta);
    }
    createVenta(ruta: Venta): Observable<Venta> {
        return this.http.post<Venta>(this.apiUrl, ruta);
    }

    deleteVenta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Eliminar/${id}`);
    }
}
