import { Component } from '@angular/core';
import { HeaderAdmComponent } from '../../admin/header-adm/header-adm.component';
import { FooterAdmComponent } from '../../admin/footer-adm/footer-adm.component';
import { SidebarAdmComponent } from '../../admin/sidebar-adm/sidebar-adm.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../models/shared/shared.module';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        HeaderAdmComponent,
        FooterAdmComponent,
        SidebarAdmComponent,
        RouterOutlet,
        SharedModule,
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {
    rutas: any = [
        { name: 'Dashboard', url: 'dashboard' },
        { name: 'opcion-2', url: 'opcion-2' },
        { name: 'opcion-3', url: 'opcion-3' },
    ];
}
