import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { ToastrService } from 'ngx-toastr';
import { IPasajero, IProductStripe } from './productStripe.interface';
import { SeleccionAsientosService } from '../services/seleccion-asientos.service';
import { IBusesDetalles } from './strapi-model';

export interface ICartStore {
    products: IProductStripe[];
    totalAmount: number;
    productsCount: number;
    busSeleccionado: IBusesDetalles[];
    pasajeros: IPasajero[];
    asientos?: any[];
    compraFinal?: any[];
}

const initialState: ICartStore = {
    products: [],
    totalAmount: 0,
    productsCount: 0,
    busSeleccionado: [],
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
    withMethods(({ products, busSeleccionado, pasajeros, ...store }, toastSvc = inject(ToastrService), seleccionAsientosSvc = inject(SeleccionAsientosService)) => {
        // Suscripción a los observables de busSeleccionado y pasajeros
        seleccionAsientosSvc.busSeleccionado$.subscribe(bus => {
            console.log('Nuevo bus seleccionado:', bus);
            patchState(store, { busSeleccionado: bus });
            updateProducts(pasajeros(), bus);  // Llama a la función para actualizar los productos
        });

        seleccionAsientosSvc.pasajeros$.subscribe(pasajeros => {
            console.log('Pasajeros actualizados:', pasajeros);
            patchState(store, { pasajeros });
            updateProducts(pasajeros, busSeleccionado());  // Llama a la función para actualizar los productos
        });

        // Función para actualizar los productos
        function updateProducts(pasajeros: any[], busSeleccionado: any) {
            if (!busSeleccionado || pasajeros.length === 0) return;

            const productos = pasajeros.map((pasajero: any, index: number) => {
                const { propietario, asiento, tipoDocumento, documento } = pasajero;
                const busId = busSeleccionado.documentId;

                const product: IProductStripe = {
                    id: index + 1, // ID de 1 a 4 (o más según el número de pasajeros)
                    title: propietario?.nombre_completo || `${propietario?.apellidos} ${propietario?.nombres}`, // Primera o segunda estructura
                    price: busSeleccionado.precioPromedio,
                    description: `${busSeleccionado.origen} - ${busSeleccionado.destino}`,
                    qty: 1,
                    tipo_doc: tipoDocumento, // Tipo de documento (DNI, Pasaporte, etc.)
                    documento: documento || propietario?.numeroDocumento, // Número de documento
                    asiento: asiento,
                    bus: busId,
                    category: '',
                    subTotal: 0
                };

                return product;
            });

            patchState(store, { products: productos });  // Actualiza los productos en el estado
        }

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
