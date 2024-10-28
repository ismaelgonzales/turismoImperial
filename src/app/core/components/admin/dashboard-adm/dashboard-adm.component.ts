import { Component } from '@angular/core';
import { VentaComponent } from '../venta/venta.component';

@Component({
    selector: 'app-dashboard-adm',
    standalone: true,
    imports: [VentaComponent],
    templateUrl: './dashboard-adm.component.html',
    styleUrl: './dashboard-adm.component.scss',
})
export class DashboardAdmComponent {}
