import { Component } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
@Component({
    selector: 'app-passengers',
    standalone: true,
    imports: [HeaderPageComponent],
    templateUrl: './passengers.component.html',
    styleUrl: './passengers.component.scss',
})
export class PassengersComponent {}
