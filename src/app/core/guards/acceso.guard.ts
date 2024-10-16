import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';

export const AccesoGuard: CanActivateFn = (route, state) => {
    const accesoService = inject(AccesoService);
    const router = inject(Router);

    if (accesoService.isAuthenticate()) {
        return true;
    } else {
        router.navigate(['/dashlogin']);
        return false;
    }
};
