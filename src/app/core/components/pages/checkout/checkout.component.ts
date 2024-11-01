import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';


import { CheckoutService } from '../../../services/checkout.service';
import {  ICartStore } from '../../../models/carrito.compras';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  cartStore = inject(ICartStore);

  private readonly _checkoutSvc = inject(CheckoutService);

  onProceedToPay(): void {
    this._checkoutSvc.onProceedToPay(this.cartStore.products());
  }

  removeItem(id: number): void {
    this.cartStore.removeFromCart(id);
  }

  clearAll(): void {
    this.cartStore.clearCart();
  }
}
