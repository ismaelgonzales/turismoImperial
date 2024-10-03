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
    {
        path: 'schedules',
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
];
