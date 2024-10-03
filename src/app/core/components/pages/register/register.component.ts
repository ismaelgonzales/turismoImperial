import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from '../../molecules/input/input.component';
import * as constantsShared from '../../../../shared/constants';
import { ButtonComponent } from '../../molecules/button/button.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        InputGroupAddonModule,
        InputGroupModule,
        ButtonModule,
        RouterModule,
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    private subs = new SubSink();
    public constantsShared: typeof constantsShared = constantsShared;
    public spinner: boolean = false;
    public principalColor: string = 'bg-[#bf303c]';

    private readonly _router = inject(Router);
    private _toastr = inject(ToastrService);

    registerForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {
        // Definición del formulario reactivo
        this.registerForm = this.fb.group(
            {
                firstName: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.minLength(2)]],

                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
            },
            { validator: this.passwordMatchValidator },
        ); // Validador para confirmar contraseñas
    }

    // Validador personalizado para asegurar que las contraseñas coincidan
    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    // Método para manejar el registro del usuario
    onRegister(): void {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value).subscribe({
                next: response => {
                    console.log('Usuario registrado con éxito:', response);
                    this.router.navigate(['/login']); // Redirige al login después de un registro exitoso
                },
                error: err => {
                    console.error('Error en el registro:', err);
                    this.errorMessage =
                        'Error en el registro. Inténtalo de nuevo.';
                },
            });
        } else {
            this.errorMessage =
                'Por favor, complete todos los campos correctamente.';
        }
    }
}
