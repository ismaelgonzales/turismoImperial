import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent: async () => {
            const m = await import('./core/components/pages/principal/principal.component');
            return m.PrincipalComponent;
        }
    }
];
