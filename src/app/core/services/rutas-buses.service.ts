import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RutasBusesService {
    private apiUrl = 'https://localhost:7216/RutasBuses';

    constructor(private http: HttpClient) {}

    // Obtener todas las rutasbuses
    getRutasBuses(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
