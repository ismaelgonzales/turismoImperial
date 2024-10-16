import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from '../../molecules/input/input.component';
import { ButtonComponent } from '../../molecules/button/button.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

// Formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from '../../../services/acceso.service';
import { RegisterRequest } from '../../../models/register-request.model'; // Modelo para el registro
import { GeneralResponse } from '../../../models/general-response.model';
import { SessionService } from '../../../services/session.service';
import { SessionConstants } from '../../../../shared/constants/general.constants';
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
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    private subs = new SubSink();
    public constantsShared: typeof constantsShared = constantsShared;
    public spinner: boolean = false;
    public principalColor: string = 'bg-[#4CAF50]'; // Puedes cambiar el color si lo deseas

    private readonly _router = inject(Router);

    // Atributos para el registro
    nombre: string = '';
    apellido: string = '';
    username: string = '';
    correo: string = '';
    password: string = '';

    constructor(private accesoService: AccesoService, private router: Router) {}

    register(): void {
        const request: RegisterRequest = {
            nombre: this.nombre,
            apellido: this.apellido,
            username: this.username,
            correo: this.correo,
            contraseña: this.password,
        };

        this.accesoService.register(request).subscribe({
            next: () => {
                console.log('Registro exitoso');
                this.router.navigate(['/dashlogin']); // Redirigir a la página de login después del registro
            },
            error: err => {
                console.error('Error en el registro', err);
            },
        });
    }
}
