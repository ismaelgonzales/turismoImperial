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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

//formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from '../../../services/acceso.service';
import { LoginRequest } from '../../../models/login-request.model';
import { GeneralResponse } from '../../../models/general-response.model';
import { SessionService } from '../../../services/session.service';
import { LoginResponse } from '../../../models/login-response.model';
import { SessionConstants } from '../../../../shared/constants/general.constants';
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

    username: string = '';
    password: string = '';

    constructor(private accesoService: AccesoService, private router: Router) {}

    login(): void {
        this.accesoService.login(this.username, this.password).subscribe({
            next: () => this.router.navigate(['/admin']),
            error: err => console.error('Login Failed', err),
        });
    }
}
