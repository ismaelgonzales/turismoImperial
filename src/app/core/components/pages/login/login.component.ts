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
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from '../../../services/acceso.service';

import { LoginResponse } from '../../../models/login-response.model';

import { SharedModule } from '../../../models/shared/shared.module';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        InputGroupAddonModule,
        InputGroupModule,
        ButtonModule,
        ReactiveFormsModule,
        NgIf,
        SharedModule,
        FormsModule,
        CommonModule,
        RouterLink,
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

    // username: string = '';
    // password: string = '';

    // constructor(
    //     private accesoService: AccesoService,
    //     private router: Router,
    //     private toastr: ToastrService,
    // ) {}

    // login(): void {
    //     this.accesoService.login(this.username, this.password).subscribe({
    //         next: (response: LoginResponse) => {
    //             this.toastr.success('Inicio de sesión exitoso');
    //             this.router.navigate(['/admin']);
    //         },
    //         error: err => {
    //             this.toastr.error('Error en el inicio de sesión', err);
    //             console.error('Error en el inicio de sesión', err);
    //         },
    //     });
    // }

    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private accesoService: AccesoService,
        private router: Router,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            contraseña: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    login(): void {
        if (this.loginForm.invalid) {
            this.toastr.error(
                'Por favor, complete todos los campos correctamente',
            );
            return;
        }

        const { username, contraseña } = this.loginForm.value;

        this.spinner = true;
        this.accesoService.login(username, contraseña).subscribe({
            next: response => {
                this.toastr.success('Inicio de sesión exitoso');
                this.router.navigate(['/admin']);
                this.spinner = false;
            },
            error: err => {
                this.toastr.error('Error en el inicio de sesión', err);
                console.error('Error en el inicio de sesión', err);
                this.spinner = false;
            },
        });
    }
}
