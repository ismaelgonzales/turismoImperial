import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccesoService } from '../services/acceso.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private accesoService: AccesoService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = this.accesoService.getToken();

        const authReq = token
            ? req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${token}`),
              })
            : req;

        return next.handle(authReq);
    }
}
