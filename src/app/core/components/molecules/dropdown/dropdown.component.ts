import { Component, Input, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Rutas {
    nombre: string;
    codigo: string;
}
@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [DropdownModule],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
    rutas: Rutas[] = [];

    rutasDestino: Rutas[] = [];

    selecionaOrigen: Rutas | undefined;
    selecionaDestino: Rutas | undefined;
    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.rutas = [
            { nombre: 'Lima', codigo: 'LIM' },
            { nombre: 'Tarma', codigo: 'TAR' },
            // { nombre: 'Merced', codigo: 'MER' },
            // { nombre: 'Acobamba', codigo: 'ACO' },
            // { nombre: 'Palca', codigo: 'PAL' },
            // { nombre: 'Huasahuasi', codigo: 'HUA' },
            // { nombre: 'SanRamon', codigo: 'SRM' },
        ];

        this.rutasDestino = [...this.rutas];
    }

    onOrigenSelect() {
        this.rutasDestino = this.rutas.filter(
            ruta => ruta.codigo !== this.selecionaOrigen?.codigo,
        );

        if (
            this.selecionaDestino &&
            this.selecionaDestino.codigo === this.selecionaOrigen?.codigo
        ) {
            this.selecionaDestino = undefined;
        }
    }

    @Input() options: any[] = [];
    @Input() optionLabel: string = 'nombre';
    @Input() formControlName: string = '';
    @Input() checkMark: boolean = false;
    @Input() showClear: boolean = false;
    @Input() placeHolder: string = '';
    @Input() filter: boolean = true;
    @Input() filterBy: string = 'nombre,codigo';
    @Input() borderTopLeft: boolean = false;
    @Input() borderTopRight: boolean = false;
    @Input() borderBottomLeft: boolean = false;
    @Input() borderBottomRight: boolean = false;
    @Input() borderEnabled: boolean = false;
    @Input() padding: string = '';
    @Input() labelIn: string | undefined;

    public borderRadius: string = '15px';

    getPadding(): string {
        switch (this.padding) {
            case 'xl':
                return '40px';
            case 'lg':
                return '30px';
            case 'md':
                return '22px';
            case 'sm':
                return '10px';
            default:
                return '0';
        }
    }
}
