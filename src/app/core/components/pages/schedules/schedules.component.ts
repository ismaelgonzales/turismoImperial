// import { Component, OnInit } from '@angular/core';
// import { RutasBuses } from '../../../interfaces/RutasBuses.interface';
// import { RutasBusesService } from '../../../services/rutas-buses.service';
// import { TableModule } from 'primeng/table';
// import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
// import { ButtonComponent } from '../../molecules/button/button.component';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SearchBarTravelComponent } from '../../organims/search-bar-travel/search-bar-travel.component';
// import { RutaDetallesComponent } from '../../organims/ruta-detalles/ruta-detalles.component';
// import { CardPrimeNgComponent } from '../../organims/card-prime-ng/card-prime-ng.component';
// import { ReactiveFormsModule } from '@angular/forms';
// @Component({
//     selector: 'app-schedules',
//     standalone: true,
//     imports: [
//         TableModule,
//         ButtonComponent,
//         RouterModule,
//         HeaderPageComponent,
//         CommonModule,
//         SearchBarTravelComponent,
//         RutaDetallesComponent,
//         CardPrimeNgComponent,
//         ReactiveFormsModule,
//     ],
//     templateUrl: './schedules.component.html',
//     styleUrl: './schedules.component.scss',
// })
// export class SchedulesComponent implements OnInit {
//     listaRutasBuses: RutasBuses[] = [];
//     formularioRutasBuses: FormGroup;

//     constructor(
//         private _rutasbusesService: RutasBusesService,
//         private fb: FormBuilder,
//     ) {
//         this.formularioRutasBuses = this.fb.group({
//             IdRutasBuses: [0],
//             CiudadOrigenId: ['', Validators.required],
//             Origen: ['', Validators.required],
//             CiudadDestinoId: ['', Validators.required],
//             Destino: ['', Validators.required],
//             TotalBusesDiarios: ['', Validators.required],
//             DuracionMin: ['', Validators.required],
//             PrimeraHoraSalida: ['', Validators.required],
//             UltimaHoraSalida: ['', Validators.required],
//             PrecioMinimo: ['', Validators.required],
//             PrecioPromedio: ['', Validators.required],
//             DuracionPromedio: ['', Validators.required],
//             DistanciaKm: ['', Validators.required],
//             TerminalSaliente: ['', Validators.required],
//             TerminalEntrante: ['', Validators.required],
//             Popular: ['', Validators.required],
//         });
//     }
//     obtenerRutasBuses() {
//         this._rutasbusesService.getList().subscribe({
//             next: data => {
//                 this.listaRutasBuses = data;
//             },
//             error: e => {},
//         });
//     }
//     ngOnInit(): void {
//         this.obtenerRutasBuses();
//     }

//     agregarRutasBuses() {
//         const Request: RutasBuses = {
//             IdRutasBuses: 0,

//             Origen: this.formularioRutasBuses.value.Origen,
//             CiudadDestinoId: 0,
//             Destino: this.formularioRutasBuses.value.Destino,
//             TotalBusesDiarios: 0,
//             DuracionMin: this.formularioRutasBuses.value.DuracionMin,
//             PrimeraHoraSalida:
//                 this.formularioRutasBuses.value.PrimeraHoraSalida,
//             UltimaHoraSalida: this.formularioRutasBuses.value.UltimaHoraSalida,
//             PrecioMinimo: this.formularioRutasBuses.value.PrecioMinimo,
//             PrecioPromedio: this.formularioRutasBuses.value.Precio,
//             DuracionPromedio: this.formularioRutasBuses.value.DuracionPromedio,
//             DistanciaKm: this.formularioRutasBuses.value.DistanciaKm,
//             TerminalSaliente: this.formularioRutasBuses.value.TerminalSaliente,
//             TerminalEntrante: this.formularioRutasBuses.value.TerminalEntrante,
//             Popular: this.formularioRutasBuses.value.Popular,
//         };
//         this._rutasbusesService.add(Request).subscribe({
//             next: data => {
//                 this.listaRutasBuses.push(data);
//                 this.formularioRutasBuses.patchValue({
//                     Origen: '',
//                     Destino: '',
//                     DuracionMin: '',
//                     PrimeraHoraSalida: '',
//                     UltimaHoraSalida: '',
//                     PrecioMinimo: '',
//                     PrecioPromedio: '',
//                     DuracionPromedio: '',
//                     DistanciaKm: '',
//                     TerminalSaliente: '',
//                     TerminalEntrante: '',
//                     Popular: false,
//                 });
//             },
//             error: e => {},
//         });
//     }

//     eliminarRutasBuses(RutasBuses: RutasBuses) {
//         this._rutasbusesService.delete(RutasBuses.IdRutasBuses).subscribe({
//             next: data => {
//                 const nuevaLista = this.listaRutasBuses.filter(
//                     item => item.IdRutasBuses !== RutasBuses.IdRutasBuses,
//                 );
//                 this.listaRutasBuses = nuevaLista;
//             },
//             error: e => {},
//         });
//     }
// }
