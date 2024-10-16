import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
    const accesoService = inject(AccesoService);
    const router = inject(Router);

    if (accesoService.isAuthenticate()) {
        return router.navigate(['/admin']);
    } else {
        return true;
    }
};
