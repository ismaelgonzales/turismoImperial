import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HeaderPageComponent } from '../../../components/atoms/header-page/header-page.component';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from '../../../components/molecules/button/button.component';
import { InputComponent } from '../../../components/molecules/input/input.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { isRequired, hasEmailError } from '../../../utils/validators';
import { GoogleButtonComponent } from '../ui/google-button/google-button.component';
import { FacebookButtonComponent } from '../ui/facebook-button/facebook-button.component';
import { FooterPageComponent } from '../../../components/atoms/footer-page/footer-page.component';

interface FormSignUp {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        InputGroupModule,
        InputGroupAddonModule,
        ButtonModule,
        RouterModule,
        ButtonComponent,
        InputComponent,
        GoogleButtonComponent,
        RouterLink,
        FacebookButtonComponent,
        HeaderPageComponent,
        FooterPageComponent,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    private _formBuilder = inject(FormBuilder);
    private _authService = inject(AuthService);
    private _router = inject(Router);

    isRequired(field: 'email' | 'password') {
        return isRequired(field, this.form);
    }

    hasEmailError() {
        return hasEmailError(this.form);
    }

    form = this._formBuilder.group<FormSignUp>({
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

            await this._authService.signUp({ email, password });

            toast.success('Usuario creado correctamente');
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
