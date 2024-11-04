import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VentaInternaService {
    private apiUrl = 'https://www.turismoimperial.somee.com/api/BusesDetalles';

    constructor(private http: HttpClient) {}

    confirmarVenta(ventaData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, ventaData);
    }
}
