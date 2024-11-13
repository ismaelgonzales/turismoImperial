import { Component, OnInit } from '@angular/core';
import { VentaComponent } from '../venta/venta.component';
import { DashboardService } from '../../../services/dashboard.service';
import { ClienteService } from '../../../services/cliente.service';
import { BusesService } from '../../../services/buses.service';
import { RutasService } from '../../../services/rutas.service';
import { VentaService } from '../../../services/venta.service';
import { ViajesService } from '../../../services/viajes.service';
import { VentasComponent } from '../../pages/ventas/ventas.component';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-dashboard-adm',
    standalone: true,
    imports: [VentaComponent, RouterLink, VentasComponent],
    templateUrl: './dashboard-adm.component.html',
    styleUrl: './dashboard-adm.component.scss',
})
export class DashboardAdmComponent implements OnInit {
    clientes: any[] = [];
    buses: any[] = [];
    ventas: any[] = [];
    rutas: any[] = [];
    viajes: any[] = [];

    totalClientes: number = 0;
    totalBuses: number = 0;
    totalVentas: number = 0;
    totalRutas: number = 0;
    totalViajes: number = 0;

    constructor(
        private dashboardService: DashboardService,
        private clienteService: ClienteService,
        private busesService: BusesService,
        private rutasService: RutasService,
        private ventaService: VentaService,
        private ViajesService: ViajesService,
    ) {}

    ngOnInit(): void {
        this.cargarDatos();
    }

    cargarDatos() {
        this.clienteService.obtenerClientes().subscribe(data => {
            this.clientes = data;
            this.totalClientes = this.clientes.length; // Actualiza totalClientes
        });

        this.busesService.obtenerBuses().subscribe(data => {
            this.buses = data;
            this.totalBuses = this.buses.length; // Actualiza totalBuses
        });

        this.ventaService.obtenerVentas().subscribe(data => {
            this.ventas = data;
            this.totalVentas = this.ventas.length; // Actualiza totalVentas
        });

        this.rutasService.obtenerRutas().subscribe(data => {
            this.rutas = data;
            this.totalRutas = this.rutas.length; // Actualiza totalRutas
        });

        this.ViajesService.obtenerViajes().subscribe(data => {
            this.viajes = data;
            this.totalViajes = this.viajes.length; // Actualiza totalRutas
        });
    }

    actualizarContadores() {
        // Por ejemplo, para clientes
        const totalClientes = this.clientes.length;
        // Haz lo mismo para buses, ventas, y rutas
    }
}
