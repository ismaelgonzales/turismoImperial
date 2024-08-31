import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from '../../molecules/input/input.component';
import * as constantsShared from '../../../../shared/constants';
import { ButtonComponent } from '../../molecules/button/button.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        InputGroupAddonModule,
        InputGroupModule,
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
}
