import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBusesDetalles, IAsientoResponse, IStrapiResponse, IAsiento } from '../models/strapi-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseURL = 'https://fruitful-broccoli-60c7faeb3a.strapiapp.com/api/';

    constructor(private _httpCliente: HttpClient) {}

    // Obtener todos los detalles de los buses
    public getAllBusesDetalles(): Observable<IBusesDetalles[]> {
        return this._httpCliente.get<IStrapiResponse<IBusesDetalles>>(`${this.baseURL}buses-detalles`)
            .pipe(
                map(response => response.data)
            );
    }

    // Obtener los asientos filtrados por documentId
    public getAsientosByDocumentId(documentId: string): Observable<IAsiento[]> {
        return this._httpCliente.get<IAsientoResponse>(`${this.baseURL}asientos?filters[buses_detalle][documentId][$eq]=${documentId}`)
            .pipe(
                map(response => {
                    console.log('Datos de asientos obtenidos de la API:', response.data);
                    return response.data;  // Retorna solo el array de asientos
                })
            );
    }
}
