import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
    selector: 'app-sidebar-adm',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar-adm.component.html',
    styleUrl: './sidebar-adm.component.scss',
})
export class SidebarAdmComponent {}
