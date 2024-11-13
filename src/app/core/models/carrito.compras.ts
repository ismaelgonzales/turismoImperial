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
    totalAmount: number;
    productsCount: number;
    busSeleccionado?: any;
    pasajeros?: any[];
    asientos?: any[];
    compraFinal?: any[];
}

const initialState: ICartStore = {
    products: [{
        id: 1,
        title: "Lima-Tarma",
        price: 45,
        category: "Regular",
        description: "blablabla",
        image: "https://res.cloudinary.com/dyelvotz0/image/upload/v1727587318/LogoImperial_nvve7x.png",
        qty: 1,
        pasajero: {
            id: 1,
            nombre_completo: "CHRISTOPHER ISMAEL , GONZALES DAVILA",
            ID_TipoDocumento: "DNI",
            Numero_Documento: 77338315,
        },
        asiento: {
            id: 1,
            numeroPiso: 2,
            idPajero: 1,
            numeroAsiento: 23,
            idBus: 23,
        },
        subTotal: 50,
    }],
    totalAmount: 0,
    productsCount: 0,
    busSeleccionado: null,
    pasajeros: [],
    asientos: [],
    compraFinal: []
};
export const ICartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({
        productsCount: computed(() => calculateProductCount(products())),
        totalAmount: computed(() => calculateTotalAmount(products())),
    })),
    withMethods(({ products, ...store }, toastSvc = inject(ToastrService), seleccionAsientosSvc = inject(SeleccionAsientosService)) => {
        // Suscripciones a SeleccionAsientosService para mantener el store actualizado
        seleccionAsientosSvc.busSeleccionado$.subscribe(busSeleccionado => {
            console.log('Nuevo bus seleccionado:', busSeleccionado);  // Se ejecuta cuando `busSeleccionado$` emite un valor
            patchState(store, { busSeleccionado });
        });

        seleccionAsientosSvc.pasajeros$.subscribe(pasajeros => {
            console.log('Pasajeros actualizados:', pasajeros);  // Se ejecuta cuando `pasajeros$` emite un valor
            patchState(store, { pasajeros });
        });

        // seleccionAsientosSvc.asientos$.subscribe(asientos => {
        //     console.log('Asientos actualizados:', asientos);  // Se ejecuta cuando `asientos$` emite un valor
        //     patchState(store, { asientos });
        // });

        seleccionAsientosSvc.totalAmount$.subscribe(totalAmount => {
            console.log('Nuevo totalAmount:', totalAmount);  // Se ejecuta cuando `totalAmount$` emite un valor
            patchState(store, { totalAmount });
        });

        seleccionAsientosSvc.compraFinal$.subscribe(compraFinal => {
            console.log('Compra final actualizada:', compraFinal);  // Se ejecuta cuando `compraFinal$` emite un valor
            patchState(store, { compraFinal });
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
    })
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
