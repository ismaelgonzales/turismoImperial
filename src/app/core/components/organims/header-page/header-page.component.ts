import { Component, inject, OnInit } from '@angular/core';
import { IHeaderOptions } from '../../../interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-header-page',
    standalone: true,
    imports: [DropdownModule, CommonModule],
    templateUrl: './header-page.component.html',
    styleUrl: './header-page.component.scss',
})
export class HeaderPageComponent implements OnInit {
    isLoggedIn: boolean = false;
    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private toastService: ToastService,
    ) {}
    private _route = inject(Router);

    public Options: IHeaderOptions[] = [
        {
            name: 'Inicio',
            type: 'button',
            route: '/',
        },
        {
            name: 'Contáctanos',
            type: 'button',
            route: 'contact',
        },
        {
            name: 'Iniciar sesión',
            type: 'button',
            route: 'login',
        },
        {
            name: 'Registrate',
            type: 'button',
            route: 'register',
        },
    ];

    public onRoute(route: string | undefined): void {
        if (route) {
            this._route.navigate([route]);
        }
    }

    public goToHome(): void {
        this._route.navigate(['principal']);
    }

    ngOnInit() {
        this.authService.getAuthState().subscribe(user => {
            this.isLoggedIn = !!user;
            if (this.isLoggedIn) {
                this.Options.push({
                    name: 'Cerrar sesión',
                    type: 'button',
                    action: () => this.logout(),
                });
            }
        });
    }

    logout() {
        this.authService.signOut().then(() => {
            this._route.navigate(['/login']);
            this.toastr.success('Usted a cerrado Sesión cerrada exitosamente');
        });
    }
}
