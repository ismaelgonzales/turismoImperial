import { Routes } from '@angular/router';

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
        path: 'login',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/login/login.component'
            );
            return m.LoginComponent;
        },
    },
    {
        path: 'register',
        loadComponent: async () => {
            const m = await import(
                './core/components/pages/register/register.component'
            );
            return m.RegisterComponent;
        },
    },
];
