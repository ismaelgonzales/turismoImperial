import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    collectionData,
    doc,
    deleteDoc,
    getDocs,
    query,
    where,
} from '@angular/fire/firestore';
import Contact from '../models/Contact';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ContactService {
    constructor(private firestore: Firestore) { }

    async addMessage(contact: Contact): Promise<void> {
        const messageCollection = collection(this.firestore, 'contact');
        const today = new Date().toISOString().slice(0, 10); // Formato "YYYY-MM-DD"

        // Consulta para verificar si el usuario ya ha enviado un mensaje hoy
        const messageQuery = query(
            messageCollection,
            where('email', '==', contact.email),
            where('date', '==', today),
        );

        const querySnapshot = await getDocs(messageQuery);

        if (!querySnapshot.empty) {
            throw new Error(
                'Ya has enviado un mensaje hoy. Inténtalo de nuevo mañana.',
            );
        }

        // if (querySnapshot.size >= 2) {
        //     throw new Error(
        //         'Has alcanzado el límite de 2 mensajes por día. Inténtalo de nuevo mañana.',
        //     );
        // }
        await addDoc(messageCollection, {
            ...contact,
            date: today,
        });
    }

    getMessage(): Observable<Contact[]> {
        const messageCollection = collection(this.firestore, 'contact');
        return collectionData(messageCollection, {
            idField: 'id',
        }) as Observable<Contact[]>;
    }

    deleteMessage(contact: Contact) {
        const docmessage = doc(this.firestore, `contact/${contact.id}`);
        return deleteDoc(docmessage);
    }
}
