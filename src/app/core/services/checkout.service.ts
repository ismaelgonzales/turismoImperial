// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { loadStripe } from '@stripe/stripe-js';
// import { switchMap } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { IProductStripe } from '../models/productStripe.interface';

// @Injectable({ providedIn: 'root' })
// export class CheckoutService {
//     private readonly _http = inject(HttpClient);
//     private readonly _url = environment.serverURL;

//     onProceedToPay(products: IProductStripe[]) {
//         return this._http
//             .post(`${this._url}/checkout`, { items: products })
//             .pipe(
//                 // Utilizamos `switchMap` para manejar la respuesta asincrónica
//                 switchMap(async (res: any) => {
//                     const stripe = await loadStripe(environment.stripeAPIKey);
//                     if (!stripe) {
//                         throw new Error('Stripe failed to load.');
//                     }
//                     // Redirigir a la página de checkout
//                     const result = await stripe.redirectToCheckout({
//                         sessionId: res.id,
//                     });
//                     if (result.error) {
//                         throw new Error(result.error.message);
//                     }
//                     return result; // Si todo fue exitoso, retornamos el resultado
//                 }),
//             )
//             .subscribe({
//                 next: result => {
//                     // Puedes manejar el resultado aquí si es necesario
//                 },
//                 error: err => {
//                     console.error('Error durante el proceso de pago:', err);
//                 },
//             });
//     }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { IProductStripe } from '../models/productStripe.interface';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private readonly _http = inject(HttpClient);
    private readonly _url = environment.serverURL;

    async openStripeCheckoutModal(sessionId: string): Promise<void> {
        const stripe = await loadStripe(environment.stripeAPIKey);
        stripe?.redirectToCheckout({ sessionId });
    }

    onProceedToPay(products: IProductStripe[]) {
        return this._http
            .post(`${this._url}/checkout`, { items: products })
            .subscribe({
                next: async (res: any) => {
                    await this.openStripeCheckoutModal(res.id); // Esto redirige a Stripe, que luego lleva a /success
                },
                error: err => console.error('Error', err),
            });
    }
}
