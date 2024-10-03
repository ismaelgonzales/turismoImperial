import { Component } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
@Component({
    selector: 'app-seats',
    standalone: true,
    imports: [HeaderPageComponent],
    templateUrl: './seats.component.html',
    styleUrl: './seats.component.scss',
})
export class SeatsComponent {}
