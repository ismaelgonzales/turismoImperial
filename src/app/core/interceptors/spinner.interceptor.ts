import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError } from 'rxjs';

export function SpinnerInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
) {
    const spinnerService = inject(NgxSpinnerService);

    spinnerService.show();

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
        }),
        finalize(() => spinnerService.hide()),
    );
}
