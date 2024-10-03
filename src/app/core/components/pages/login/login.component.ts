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
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

//formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        InputGroupAddonModule,
        InputGroupModule,
        ButtonModule,
        RouterModule,
        ReactiveFormsModule,
        NgIf,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private subs = new SubSink();
    public constantsShared: typeof constantsShared = constantsShared;
    public spinner: boolean = false;
    public principalColor: string = 'bg-[#bf303c]';

    private readonly _router = inject(Router);
    private _toastr = inject(ToastrService);

    loginForm!: FormGroup;

    errorMessage: string = '';

    constructor(private fb: FormBuilder, private router: Router) {
        // Inicializar el formulario de login
        this.loginForm = this.fb.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    // Método para manejar el envío del formulario de inicio de sesión
    onLogin(): void {
        if (this.loginForm.valid) {
            const { usuario, password } = this.loginForm.value;

            // Aquí iría la lógica de autenticación (simulada o con un servicio real)
            if (this.authenticate(usuario, password)) {
                this.router.navigate(['/']); // Redirige a la página de inicio en caso de éxito
            } else {
                this.errorMessage = 'Usuario o contraseña incorrectos';
            }
        } else {
            this.errorMessage = 'Por favor, complete todos los campos.';
        }
    }

    // Simulación de autenticación (debes reemplazarla con un servicio real)
    authenticate(usuario: string, password: string): boolean {
        // Ejemplo de autenticación
        return usuario === 'admin' && password === 'admin'; // Cambia esto con lógica real
    }
}
