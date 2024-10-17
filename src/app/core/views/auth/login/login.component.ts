import { Component, inject } from '@angular/core';
import { HeaderPageComponent } from '../../../components/atoms/header-page/header-page.component';
import { SharedModule } from '../../../models/shared/shared.module';
import { FacebookButtonComponent } from '../ui/facebook-button/facebook-button.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { Router, RouterLink } from '@angular/router';

import { NgIf } from '@angular/common';
import { GoogleButtonComponent } from '../ui/google-button/google-button.component';
import { toast } from 'ngx-sonner';
import { isRequired, hasEmailError } from '../../../utils/validators';
import { FooterPageComponent } from '../../../components/atoms/footer-page/footer-page.component';

export interface FormSignIn {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        SharedModule,
        NgIf,
        GoogleButtonComponent,
        RouterLink,
        FacebookButtonComponent,
        HeaderPageComponent,
        FooterPageComponent,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private _formBuilder = inject(FormBuilder);
    private _authService = inject(AuthService);
    private _router = inject(Router);

    isRequired(field: 'email' | 'password') {
        return isRequired(field, this.form);
    }

    hasEmailError() {
        return hasEmailError(this.form);
    }

    form = this._formBuilder.group<FormSignIn>({
        email: this._formBuilder.control('', [
            Validators.required,
            Validators.email,
        ]),
        password: this._formBuilder.control('', Validators.required),
    });

    async submit() {
        if (this.form.invalid) return;

        try {
            const { email, password } = this.form.value;

            if (!email || !password) return;

            await this._authService.signIn({ email, password });

            toast.success('Hola nuevamente');
            this._router.navigateByUrl('/');
        } catch (error) {
            toast.error('Ocurrio un error');
        }
    }

    async submitWithGoogle() {
        try {
            await this._authService.signInWithGoogle();
            toast.success('Bienvenido denuevo');
            this._router.navigateByUrl('/');
        } catch (error) {
            toast.error('Ocurrio un error');
        }
    }

    async submitWithFacebook() {
        try {
            await this._authService.signInWithFacebook();
            toast.success('Bienvenido denuevo');
            this._router.navigateByUrl('/');
        } catch (error) {
            toast.error('Ocurrio un error');
        }
    }
}
