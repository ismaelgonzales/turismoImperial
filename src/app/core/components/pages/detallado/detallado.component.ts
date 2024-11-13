import { Component, inject } from '@angular/core';
import { ICartStore } from '../../../models/carrito.compras';

@Component({
    selector: 'app-detallado',
    standalone: true,
    imports: [],
    templateUrl: './detallado.component.html',
    styleUrl: './detallado.component.scss',
})
export class DetalladoComponent {
    cartStore = inject(ICartStore);
}
