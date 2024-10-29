import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IVehiculo } from '../models/Vehiculo';

@Injectable({
    providedIn: 'root',
})
export class VehiculoService {
    apiUrl = 'https://www.turismoimperial.somee.com/api/Vehiculo';

    constructor(private http: HttpClient) {}

    getAllVehiculos(): Observable<IVehiculo[]> {
        return this.http.get<IVehiculo[]>(`${this.apiUrl}`);
    }

    getVehiculos(id: number): Observable<ApiResponse<IVehiculo>> {
        return this.http.get<ApiResponse<IVehiculo>>(`${this.apiUrl}/${id}`);
    }

    createVehiculos(viajes: IVehiculo): Observable<any> {
        return this.http.post(`${this.apiUrl}`, viajes);
    }

    updateVehiculos(id: number, viajes: IVehiculo): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, viajes);
    }

    deleteVehiculos(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
