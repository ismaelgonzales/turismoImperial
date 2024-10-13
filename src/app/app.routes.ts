import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './core/views/auth/login/login.component';
import { TemplateComponent } from './core/views/dashboard/template/template.component';
import { MantUsuarioListComponent } from './core/views/Mantenimiento/mant-usuario-list/mant-usuario-list.component';
import { MantPersonaListComponent } from './core/views/Mantenimiento/mant-persona-list/mant-persona-list.component';
import { MantColaboradorListComponent } from './core/views/Mantenimiento/mant-colaborador-list/mant-colaborador-list.component';
import { privateGuard, publicGuard } from './core/guards/auth.guard';

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
        path: 'dashlogin',

        loadComponent: async () => {
            const m = await import(
                './core/components/pages/login/login.component'
            );
            return m.LoginComponent;
        },
    },
    {
        path: 'footer',
        loadComponent: async () => {
            const m = await import(
                './core/components/atoms/footer-page/footer-page.component'
            );
            return m.FooterPageComponent;
        },
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
        path: 'schedules',
        canActivateChild: [publicGuard()],
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/schedules/schedules.component'
            );
            return m.SchedulesComponent;
        },
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
        path: 'contact',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/contact/contact.component'
            );
            return m.ContactComponent;
        },
    },
    {
        path: 'dashboard',

        loadComponent: () =>
            import('./core/views/dashboard/template/template.component').then(
                c => c.TemplateComponent,
            ),
    },
    {
        path: 'login',

        loadComponent: () =>
            import('./core/views/auth/login/login.component').then(
                c => c.LoginComponent,
            ),
    },
    {
        path: 'register',

        loadComponent: () =>
            import('./core/views/auth/register/register.component').then(
                c => c.RegisterComponent,
            ),
    },

    // {
    //     path: 'auth',
    //     component: LoginComponent,
    // },
    // {
    //     path: 'dashboard',
    //     component: TemplateComponent,
    //     children: [
    //         {
    //             path: 'mantenimiento',
    //             children: [
    //                 { path: 'usuario', component: MantUsuarioListComponent },
    //                 { path: 'persona', component: MantPersonaListComponent },
    //                 {
    //                     path: 'colaborador',
    //                     component: MantColaboradorListComponent,
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        path: 'admin',
        loadComponent: () =>
            import('./core/components/pages/admin/admin.component').then(
                c => c.AdminComponent,
            ),

        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import(
                        './core/components/admin/dashboard-adm/dashboard-adm.component'
                    ).then(c => c.DashboardAdmComponent),
            },
            {
                path: 'opcion-2',
                loadComponent: () =>
                    import(
                        './core/components/admin/op-2-dash/op-2-dash.component'
                    ).then(c => c.Op2DashComponent),
            },
            {
                path: 'opcion-3',
                loadComponent: () =>
                    import(
                        './core/components/admin/op-3-dash/op-3-dash.component'
                    ).then(c => c.Op3DashComponent),
            },
            {
                path: 'opcion-4',
                loadComponent: () =>
                    import(
                        './core/components/admin/op-4-dash/op-4-dash.component'
                    ).then(c => c.Op4DashComponent),
            },
        ],
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
