import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    Auth,
    authState,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
} from '@angular/fire/auth';

export interface User {
    email: string;
    password: string;
}
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    getAuthState(): Observable<any> {
        return authState(this.auth);
    }
    private _auth = inject(Auth);
    constructor(private auth: Auth) {}
    signOut() {
        return signOut(this.auth)
            .then(() => {
                console.log('Usted Cerro Sesión cerrada exitosamente');
            })
            .catch(error => {
                console.error('Error al cerrar sesión: ', error);
            });
    }

    signUp(user: User) {
        return createUserWithEmailAndPassword(
            this._auth,
            user.email,
            user.password,
        );
    }

    signIn(user: User) {
        return signInWithEmailAndPassword(
            this._auth,
            user.email,
            user.password,
        );
    }

    signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({ prompt: 'select_account' });

        return signInWithPopup(this._auth, provider);
    }

    signInWithFacebook() {
        const provider = new FacebookAuthProvider();

        provider.setCustomParameters({ prompt: 'select_account' });

        return signInWithPopup(this._auth, provider);
    }
}
