import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private apiUrl = 'https://fruitful-broccoli-60c7faeb3a.strapiapp.com/api/compras';

  constructor(private http: HttpClient) {}

  postCompra(compraData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, compraData, { headers });
  }
}
