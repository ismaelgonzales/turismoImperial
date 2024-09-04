import { Component, inject } from '@angular/core';
import { IHeaderOptions } from '../../../interfaces';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-footer-page',
    standalone: true,
    imports: [RouterModule, NgFor, NgIf],
    templateUrl: './footer-page.component.html',
    styleUrls: ['./footer-page.component.scss'],
})
export class FooterPageComponent {
    private _route = inject(Router);
    public currentYear: number = new Date().getFullYear();
    public showMoreLinks = false;

    public FooterOptions: IHeaderOptions[] = [
        {
            name: 'Servicio al Cliente',
            type: 'link',
            route: '/register',
        },
        {
            name: 'Acerca de Nosotros',
            type: 'link',
            route: '/register',
        },
        {
            name: 'Política de Privacidad',
            type: 'link',
            route: '/register',
        },
        {
            name: 'Términos y Condiciones',
            type: 'link',
            route: '/register',
        },
        {
            name: 'DIRECCIÓN: Calle Pisac 284 Int. 2 Urb, Ate 15012',
            type: 'text',
        },
        {
            name: 'TELÉFONO: 920 198 872',
            type: 'text',
        },
        {
            name: 'CORREO: turismoImperial@gmail.com',
            type: 'text',
        },
    ];

    public onRoute(route: string | undefined): void {
        if (route) {
            this._route.navigate([route]);
        }
    }
    public toggleMoreLinks(): void {
        this.showMoreLinks = !this.showMoreLinks;
        const moreLinksUl = document.querySelector(
            '.more-links ul',
        ) as HTMLElement;
        if (moreLinksUl) {
            moreLinksUl.style.maxHeight = this.showMoreLinks ? '500px' : '0';
        }
    }
}
