import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VentaInternaService {
    private apiUrl =
        'https://fruitful-broccoli-60c7faeb3a.strapiapp.com/api/buses-detalles';

    constructor(private http: HttpClient) {}

    confirmarVenta(ventaData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, ventaData);
    }
}
