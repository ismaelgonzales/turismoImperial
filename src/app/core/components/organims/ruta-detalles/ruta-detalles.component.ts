import { Component } from '@angular/core';
import { DropdownComponent } from '../../molecules/dropdown/dropdown.component';
import { InputCalendarComponent } from '../../molecules/input-calendar/input-calendar.component';
import { ButtonComponent } from '../../molecules/button/button.component';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-ruta-detalles',
    standalone: true,
    imports: [
        DropdownComponent,
        InputCalendarComponent,
        ButtonComponent,
        RouterModule,
    ],
    templateUrl: './ruta-detalles.component.html',
    styleUrl: './ruta-detalles.component.scss',
})
export class RutaDetallesComponent {}
