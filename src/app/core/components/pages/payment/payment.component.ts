import { Component } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [HeaderPageComponent],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
})
export class PaymentComponent {}
