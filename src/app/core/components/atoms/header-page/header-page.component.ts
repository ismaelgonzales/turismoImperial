import { Component, inject } from '@angular/core';
import { IHeaderOptions } from '../../../interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-page',
    standalone: true,
    imports: [DropdownModule],
    templateUrl: './header-page.component.html',
    styleUrl: './header-page.component.scss',
})
export class HeaderPageComponent {
    private _route = inject(Router);

    public Options: IHeaderOptions[] = [
        {
            name: 'Español',
            type: 'dropdown',
            options: [
                { name: 'Español', cod: 'ES' },
                { name: 'English', cod: 'EN' },
            ],
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
}
