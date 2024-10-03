import { Component } from '@angular/core';

import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [HeaderPageComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent {}
