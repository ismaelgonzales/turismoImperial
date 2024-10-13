import { Component } from '@angular/core';
import { SharedModule } from '../../../models/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-template',
    standalone: true,
    imports: [SharedModule, RouterModule],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss',
})
export class TemplateComponent {
    rutas: any = [
        { name: 'Usuario', url: 'mantenimiento/usuario' },
        { name: 'Persona', url: 'mantenimiento/persona' },
        { name: 'Colabordor', url: 'mantenimiento/colaborador' },
    ];
}
