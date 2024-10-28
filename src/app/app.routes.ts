import { Routes } from '@angular/router';

import { privateGuard, publicGuard } from './core/guards/auth.guard';
import { AccesoGuard } from './core/guards/acceso.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/principal/principal.component'
            );
            return m.PrincipalComponent;
        },
    },
    {
        canActivate: [publicGuard],
        path: 'login',

        loadComponent: () =>
            import('./core/views/auth/login/login.component').then(
                c => c.LoginComponent,
            ),
    },
    {
        canActivate: [publicGuard],
        path: 'register',

        loadComponent: () =>
            import('./core/views/auth/register/register.component').then(
                c => c.RegisterComponent,
            ),
    },
    {
        path: 'seats',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/seats/seats.component'
            );
            return m.SeatsComponent;
        },
    },
    {
        canActivate: [privateGuard()],
        path: 'contact',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/contact/contact.component'
            );
            return m.ContactComponent;
        },
    },
    {
        path: 'rutas',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/rutas/rutas.component'
            );
            return m.RutasComponent;
        },
    },

    {
        canActivate: [privateGuard()],
        path: 'seleccion-asientos',

        loadComponent: async () => {
            const m = await import(
                './core/components/pages/seleccion-asientos/seleccion-asientos.component'
            );
            return m.SeleccionAsientosComponent;
        },
    },
    {
        path: 'seat-selection',

        loadComponent: async () => {
            const m = await import(
                './core/components/pages/seat-selection/seat-selection.component'
            );
            return m.SeatSelectionComponent;
        },
    },
    {
        canActivate: [privateGuard()],
        path: 'datos-pasajero',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/datos-pasajero/datos-pasajero.component'
            );
            return m.DatosPasajeroComponent;
        },
    },
    {
        path: 'dashlogin',

        loadComponent: async () => {
            const m = await import(
                './core/components/pages/login/login.component'
            );
            return m.LoginComponent;
        },
        canActivate: [AuthenticatedGuard],
    },
    {
        path: 'dashregister',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/register/register.component'
            );
            return m.RegisterComponent;
        },
    },
    {
        canActivate: [AccesoGuard],
        path: 'admin',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/admin/admin.component'
            );
            return m.AdminComponent;
        },

        children: [
            {
                path: 'dashboard',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/dashboard-adm/dashboard-adm.component'
                    );
                    return m.DashboardAdmComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'buses',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/buses/buses.component'
                    );
                    return m.BusesComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'clientes',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/clientes/clientes.component'
                    );
                    return m.ClientesComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'conductores',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/conductores/conductores.component'
                    );
                    return m.ConductoresComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'facturacion',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/facturacion/facturacion.component'
                    );
                    return m.FacturacionComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'incidencias',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/incidencias/incidencias.component'
                    );
                    return m.IncidenciasComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'reportes',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/reportes/reportes.component'
                    );
                    return m.ReportesComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'reservas',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/reservas/reservas.component'
                    );
                    return m.ReservasComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'rutas',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/rutas/rutas.component'
                    );
                    return m.RutasComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'vehiculos',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/vehiculos/vehiculos.component'
                    );
                    return m.VehiculosComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'viajes',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/viajes/viajes.component'
                    );
                    return m.ViajesComponent;
                },
                canActivate: [AccesoGuard],
            },
        ],
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
