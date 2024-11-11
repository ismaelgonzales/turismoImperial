
import { Component, inject, Output } from '@angular/core';


import { CheckoutService } from '../../../services/checkout.service';
import { ICartStore } from '../../../models/carrito.compras';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
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



