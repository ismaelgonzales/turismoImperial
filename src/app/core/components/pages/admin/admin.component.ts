import { Component } from '@angular/core';
import { HeaderAdmComponent } from '../../admin/header-adm/header-adm.component';
import { FooterAdmComponent } from '../../admin/footer-adm/footer-adm.component';
import { SidebarAdmComponent } from '../../admin/sidebar-adm/sidebar-adm.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        HeaderAdmComponent,
        FooterAdmComponent,
        SidebarAdmComponent,
        RouterOutlet,
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {}
