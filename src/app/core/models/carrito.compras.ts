import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { ToastrService } from 'ngx-toastr';
import { IProductStripe } from './productStripe.interface';
import { SeleccionAsientosService } from '../services/seleccion-asientos.service';


export interface ICartStore {
    products: IProductStripe[];
    totalAmount2: number;
    productsCount: number;
}

const initialState: ICartStore = {
    products: [{
        id: 1,
        title: "Pago de pasajes",
        price: 0,
        category: "",
        description: "",
        image: "https://res.cloudinary.com/dyelvotz0/image/upload/v1727587318/LogoImperial_nvve7x.png",
        qty: 1,
        subTotal: 0,
    }],
    totalAmount2: 0,
    productsCount: 0,
};

export const ICartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({
        productsCount: computed(() => calculateProductCount(products())),
        totalAmount: computed(() => calculateTotalAmount(products())),
    })),
    withMethods(
        ({ products, ...store }, 
         toastSvc = inject(ToastrService), 
         seleccionAsientosService = inject(SeleccionAsientosService)) => {

            // Suscripción a totalAmount$ de SeleccionAsientosService
            seleccionAsientosService.totalAmount$.subscribe((newTotalAmount) => {
                patchState(store, { totalAmount2: newTotalAmount });

                // Actualizamos el precio de todos los productos en el carrito
                const updatedProducts = products().map(product => ({
                    ...product,
                    price: newTotalAmount
                }));

                patchState(store, { products: updatedProducts });
            });

            return {
                addToCart(product: IProductStripe) {
                    const isProductInCart = products().find(
                        (item: IProductStripe) => item.id === product.id
                    );

                    if (isProductInCart) {
                        isProductInCart.qty++;
                        isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
                        patchState(store, { products: [...products()] });
                    } else {
                        patchState(store, { products: [...products(), product] });
                    }
                    toastSvc.success('Asiento seleccionado');
                },
                removeFromCart(id: number) {
                    const updatedProducts = products().filter((product) => product.id !== id);
                    patchState(store, { products: updatedProducts });
                    toastSvc.info('Asiento removido');
                },
                clearCart() {
                    patchState(store, initialState);
                    toastSvc.info('Carrito Vacio');
                }
            };
        }
    )
);

function calculateTotalAmount(products: IProductStripe[]): number {
    return products.reduce(
        (acc, product) => acc + product.price * product.qty,
        0
    );
}

function calculateProductCount(products: IProductStripe[]): number {
    return products.reduce((acc, product) => acc + product.qty, 0);
}
