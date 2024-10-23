import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from '../../molecules/input/input.component';
import { ButtonComponent } from '../../molecules/button/button.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AccesoService } from '../../../services/acceso.service';
import { RegisterRequest } from '../../../models/register-request.model';

import * as constantsShared from '../../../../shared/constants';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        InputGroupAddonModule,
        InputGroupModule,
        ButtonModule,
        ReactiveFormsModule,
        NgIf,
        FormsModule,
        CommonModule,
        RouterLink,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    private subs = new SubSink();
    public constantsShared: typeof constantsShared = constantsShared;
    public spinner: boolean = false;
    public principalColor: string = 'bg-[#4CAF50]'; // Cambia el color si lo deseas

    registerForm: FormGroup;

    constructor(
        private accesoService: AccesoService,
        private router: Router,
        private toastr: ToastrService,
        private fb: FormBuilder,
    ) {
        this.registerForm = this.fb.group({
            nombre: ['', [Validators.required]],
            apellido: ['', [Validators.required]],
            username: ['', [Validators.required]],
            correo: ['', [Validators.required, Validators.email]],
            contraseña: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    register(): void {
        if (this.registerForm.invalid) {
            this.toastr.error(
                'Por favor, completa todos los campos correctamente',
            );
            return;
        }

        const request: RegisterRequest = this.registerForm.value;

        this.accesoService.register(request).subscribe({
            next: () => {
                console.log('Registro exitoso');
                this.toastr.success('Registro exitoso');
                this.router.navigate(['/dashlogin']);
            },
            error: err => {
                this.toastr.error('Error en el registro', err.message);
                console.error('Error en el registro', err);
            },
        });
    }
}
