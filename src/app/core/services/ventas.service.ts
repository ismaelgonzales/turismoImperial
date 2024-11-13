import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
} from 'firebase/firestore';
import Ventas from '../models/Ventas';
import { from, Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
@Injectable({
    providedIn: 'root',
})
export class VentasService {
    private db = getFirestore(initializeApp(environment.firebaseConfig));

    constructor() {}

    // Método para obtener todas las ventas
    getVentas(): Observable<Ventas[]> {
        const ventasCollection = collection(this.db, 'ventas');
        return from(
            getDocs(ventasCollection).then(snapshot =>
                snapshot.docs.map(
                    doc => ({ ventaId: doc.id, ...doc.data() } as Ventas),
                ),
            ),
        );
    }

    // Método para agregar una venta
    addVenta(venta: Ventas): Promise<void> {
        const ventasCollection = collection(this.db, 'ventas');
        return addDoc(ventasCollection, venta).then();
    }

    // updateVenta(venta: Ventas): Promise<void> {
    //     if (!venta.ventaId) {
    //         throw new Error("La venta no tiene 'ventaId'.");
    //     }
    //     const ventaDoc = doc(this.db, 'ventas', venta.ventaId);
    //     return updateDoc(ventaDoc,venta);

    // }

    // Método para eliminar una venta
    deleteVenta(ventaId: string): Promise<void> {
        const ventaDoc = doc(this.db, 'ventas', ventaId);
        return deleteDoc(ventaDoc);
    }
}
