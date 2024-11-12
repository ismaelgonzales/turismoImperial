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
    return this._http.post(`${this._url}/checkout`, { items: products }).subscribe({
      next: async (res: any) => {
        await this.openStripeCheckoutModal(res.id);  // Esto redirige a Stripe, que luego lleva a /success
      },
      error: (err) => console.error('Error', err),
    });
  }
}
