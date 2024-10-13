import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/general-response.model';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { ApiUrlConstants } from '../../shared/constants/general.constants';
// import {
//     createUserWithEmailAndPassword,
//     getAuth,
//     GoogleAuthProvider,
//     signInWithPopup,
//     signOut,
// } from 'firebase/auth';

import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from '@angular/fire/auth';
import { Usuario } from '../interfaces/Usuario.interface';

export interface User {
    email: string;
    password: string;
}
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _auth = inject(Auth);

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

        // provider.setCustomParameters({ prompt: 'select_account' });

        return signInWithPopup(this._auth, provider);
    }
}
