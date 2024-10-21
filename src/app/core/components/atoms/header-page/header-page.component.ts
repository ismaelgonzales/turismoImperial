import { Component, inject } from '@angular/core';
import { IHeaderOptions } from '../../../interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-header-page',
    standalone: true,
    imports: [DropdownModule],
    templateUrl: './header-page.component.html',
    styleUrl: './header-page.component.scss',
})
export class HeaderPageComponent {
    constructor(private authService: AuthService, private router: Router) {}
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
        // {
        //     name: 'logout',
        //     type: 'button',
        //     route: 'login',
        // },
    ];

    public onRoute(route: string | undefined): void {
        if (route) {
            this._route.navigate([route]);
        }
    }

    public goToHome(): void {
        this._route.navigate(['principal']);
    }

    onLogout() {
        this.authService.signOut().then(() => {
            // Opcional: redirigir a la página de login después de cerrar sesión
            this.router.navigate(['/login']);
        });
    }
}
