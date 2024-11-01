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


export interface ICartStore {
    products: IProductStripe[];
    totalAmount: number;
    productsCount: number;
}

const initialState: ICartStore = {
    products: [{
        id: 1,
        title: "Lima-Tarma",
        price: 50,
        category: "Regular",
        description: "blablabla",
        image: "https://res.cloudinary.com/dyelvotz0/image/upload/v1727587318/LogoImperial_nvve7x.png",
        qty: 1,
        pasajero: { id: 1,
        nombre_completo: "CHRISTOPHER ISMAEL , GONZALES DAVILA",
        ID_TipoDocumento: "DNI",
        Numero_Documento: 77338315,
        },
        asiento: {
        id:1,
        numeroPiso: 2,
        idPajero: 1,
        numeroAsiento: 23 ,
        idBus:23,
      },
        subTotal: 50,
      },
      {
        id: 2,
        title: "Lima-Tarma",
        price: 50,
        category: "Regular",
        description: "blablabla",
        image: "https://res.cloudinary.com/dyelvotz0/image/upload/v1727587318/LogoImperial_nvve7x.png",
        qty: 1,
        pasajero:{ id: 2,
            nombre_completo: "CHRISTOPHER ISMAEL , GONZALES DAVILA",
            ID_TipoDocumento: "DNI",
            Numero_Documento: 77338315,
            },
        asiento: {
        id:2,
        numeroPiso: 2,
        idPajero: 1,
        numeroAsiento: 26 ,
        idBus:23,
      },
        subTotal: 50,
      }
      
],
    totalAmount: 0,
    productsCount: 0,
};

export const ICartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({
        productsCount: computed(() => calculateProductCount(products())),
        totalAmount: computed(() => calculateTotalAmount(products())),
    })),
    withMethods(({ products, ...store }, toastSvc = inject(ToastrService)) => ({
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
            toastSvc.success('Product added', 'DOMINI STORE');
        },
        removeFromCart(id: number) {
            const updatedProducts = products().filter((product) => product.id !== id);
            patchState(store, { products: updatedProducts });
            toastSvc.info('Product removed', 'DOMINI STORE');
        },
        clearCart() {
            patchState(store, initialState);
            toastSvc.info('Cart cleared', 'DOMINI STORE');
        },
    }))
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
