import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { LoginRequest } from '../models/login-request.model';
import { ApiUrlConstants } from '../../shared/constants/general.constants';
import { GeneralResponse } from '../models/general-response.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterResponse } from '../models/register-response.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class AccesoService {
    private LOGIN_URL =
        'https://www.turismoimperial.somee.com/api/Acceso/Login';

    private REGISTER_URL =
        'https://www.turismoimperial.somee.com/api/Acceso/Register';

    private tokenKey = 'authToken';
    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, contraseña: string): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(this.LOGIN_URL, { username, contraseña })
            .pipe(
                tap(response => {
                    if (response.token) {
                        console.log(response.token);
                        this.setToken(response.token);
                    }
                }),
            );
    }

    register(request: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(this.REGISTER_URL, request);
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.tokenKey);
        } else {
            return null;
        }
    }

    isAuthenticate(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;

        return Date.now() < exp;
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/dashlogin']);
    }
}
