import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BusesService {
    private apiUrl = 'https://www.turismoimperial.somee.com/api/Buses';

    constructor(private http: HttpClient) {}

    // Obtener todos los buses
    getBuses(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
