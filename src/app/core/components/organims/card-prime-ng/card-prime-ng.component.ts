import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
    selector: 'app-card-prime-ng',
    standalone: true,
    imports: [CardModule, ButtonModule],
    templateUrl: './card-prime-ng.component.html',
    styleUrl: './card-prime-ng.component.scss',
})
export class CardPrimeNgComponent {}
