import { Routes } from '@angular/router';

import { MantUsuarioListComponent } from './core/components/admin/Mantenimiento/mant-usuario-list/mant-usuario-list.component';
import { MantPersonaListComponent } from './core/components/admin/Mantenimiento/mant-persona-list/mant-persona-list.component';
import { MantColaboradorListComponent } from './core/components/admin/Mantenimiento/mant-colaborador-list/mant-colaborador-list.component';

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
    // {
    //     path: 'schedules',
    //     canActivateChild: [publicGuard()],
    //     loadComponent: async () => {
    //         const m = await import(
    //             './core/components/pages/schedules/schedules.component'
    //         );
    //         return m.SchedulesComponent;
    //     },
    // },
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
        path: 'passengers',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/passengers/passengers.component'
            );
            return m.PassengersComponent;
        },
    },

    {
        path: 'payment',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/payment/payment.component'
            );
            return m.PaymentComponent;
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
                path: 'opcion-2',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/op-2-dash/op-2-dash.component'
                    );
                    return m.Op2DashComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'opcion-3',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/op-3-dash/op-3-dash.component'
                    );
                    return m.Op3DashComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'opcion-4',
                loadComponent: async () => {
                    const m = await import(
                        './core/components/admin/op-4-dash/op-4-dash.component'
                    );
                    return m.Op4DashComponent;
                },
                canActivate: [AccesoGuard],
            },
            {
                path: 'mantenimiento',
                children: [
                    { path: 'usuario', component: MantUsuarioListComponent },
                    { path: 'persona', component: MantPersonaListComponent },
                    {
                        path: 'colaborador',
                        component: MantColaboradorListComponent,
                    },
                ],
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
