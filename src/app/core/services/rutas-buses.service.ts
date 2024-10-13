import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

import { RutasBuses } from '../interfaces/RutasBuses.interface';

@Injectable({
    providedIn: 'root',
})
export class RutasBusesService {
    private endpoint: string = environment.endPoint;
    private apiUrl: string = this.endpoint + 'RutasBuses/';

    constructor(private http: HttpClient) {}

    getList(): Observable<RutasBuses[]> {
        return this.http.get<RutasBuses[]>(`${this.endpoint}RutasBuses`);
    }

    add(request: RutasBuses): Observable<RutasBuses> {
        return this.http.post<RutasBuses>(`${this.apiUrl}Agregar`, request);
    }

    delete(IdRutasBuses: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}Eliminar/${IdRutasBuses}`);
    }
}
