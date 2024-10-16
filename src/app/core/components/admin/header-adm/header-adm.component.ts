import { Component } from '@angular/core';
import { AccesoService } from '../../../services/acceso.service';

@Component({
    selector: 'app-header-adm',
    standalone: true,
    imports: [],
    templateUrl: './header-adm.component.html',
    styleUrl: './header-adm.component.scss',
})
export class HeaderAdmComponent {
    constructor(private accesoService: AccesoService) {}

    logout(): void {
        this.accesoService.logout();
    }
}
