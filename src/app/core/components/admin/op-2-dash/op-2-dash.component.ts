import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutasBuses } from '../../../interfaces/RutasBuses.interface';
import { RutasBusesService } from '../../../services/rutas-buses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-op-2-dash',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './op-2-dash.component.html',
    styleUrl: './op-2-dash.component.scss',
})
export class Op2DashComponent {
    listaRutasBuses: RutasBuses[] = [];
    formularioRutasBuses: FormGroup;

    constructor(
        private _rutasbusesService: RutasBusesService,
        private fb: FormBuilder,
    ) {
        this.formularioRutasBuses = this.fb.group({
            IdRutasBuses: ['', Validators.required],
            Origen: ['', Validators.required],

            Destino: ['', Validators.required],

            DuracionMin: ['', Validators.required],
            PrimeraHoraSalida: ['', Validators.required],
        });
    }
    obtenerRutasBuses() {
        this._rutasbusesService.getList().subscribe({
            next: data => {
                this.listaRutasBuses = data;
            },
            error: e => {},
        });
    }
    ngOnInit(): void {
        this.obtenerRutasBuses();
    }

    agregarRutasBuses() {
        const Request: RutasBuses = {
            IdRutasBuses: this.formularioRutasBuses.value.IdRutasBuses,
            Origen: this.formularioRutasBuses.value.Origen,

            Destino: this.formularioRutasBuses.value.Destino,

            DuracionMin: this.formularioRutasBuses.value.DuracionMin,
            PrimeraHoraSalida:
                this.formularioRutasBuses.value.PrimeraHoraSalida,
        };
        this._rutasbusesService.add(Request).subscribe({
            next: data => {
                this.listaRutasBuses.push(data);
                this.formularioRutasBuses.patchValue({
                    IdRutasBuses: 0,
                    Origen: '',
                    Destino: '',
                    DuracionMin: '',
                    PrimeraHoraSalida: '',
                });
            },
            error: e => {},
        });
    }

    eliminarRutasBuses(RutasBuses: RutasBuses) {
        this._rutasbusesService.delete(RutasBuses.IdRutasBuses).subscribe({
            next: data => {
                const nuevaLista = this.listaRutasBuses.filter(
                    item => item.IdRutasBuses !== RutasBuses.IdRutasBuses,
                );
                this.listaRutasBuses = nuevaLista;
            },
            error: e => {},
        });
    }
}
