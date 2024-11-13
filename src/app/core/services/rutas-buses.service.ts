import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

import { RutasBuses } from '../interfaces/RutasBuses.interface';

@Injectable({
    providedIn: 'root',
})
export class RutasBusesService {
    private apiUrl: string =
        'https://www.turismoimperial.somee.com/api/RutasBuses'; // Usa la URL correcta para tu API

    constructor(private http: HttpClient) {}

    // Obtener lista de rutas de buses
    getList(): Observable<RutasBuses[]> {
        return this.http.get<RutasBuses[]>(`${this.apiUrl}`);
    }

    // Agregar una nueva ruta de bus
    add(request: RutasBuses): Observable<RutasBuses> {
        return this.http.post<RutasBuses>(`${this.apiUrl}/Agregar`, request);
    }

    // Actualizar una ruta de bus existente
    updateRuta(id: number, ruta: RutasBuses): Observable<RutasBuses> {
        return this.http.put<RutasBuses>(
            `${this.apiUrl}/Actualizar/${id}`,
            ruta,
        );
    }
    createRuta(ruta: RutasBuses): Observable<RutasBuses> {
        return this.http.post<RutasBuses>(this.apiUrl, ruta);
    }

    // Eliminar una ruta de bus
    deleteRuta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Eliminar/${id}`);
    }
}
