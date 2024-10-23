import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutasBuses } from '../../../interfaces/RutasBuses.interface';
import { RutasBusesService } from '../../../services/rutas-buses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Venta } from '../../../interfaces/Venta.interface';
import { VentaService } from '../../../services/venta.service';
@Component({
    selector: 'app-op-2-dash',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './op-2-dash.component.html',
    styleUrl: './op-2-dash.component.scss',
})
export class Op2DashComponent {
    // listaRutasBuses: RutasBuses[] = [];
    // formularioRutasBuses: FormGroup;
    // isEditing: boolean = false;
    // constructor(
    //     private _rutasbusesService: RutasBusesService,
    //     private fb: FormBuilder,
    // ) {
    //     this.formularioRutasBuses = this.fb.group({
    //         IdRutasBuses: ['', Validators.required],
    //         Origen: ['', Validators.required],
    //         Destino: ['', Validators.required],
    //         DuracionMin: ['', Validators.required],
    //         PrimeraHoraSalida: ['', Validators.required],
    //     });
    // }
    // ngOnInit(): void {
    //     this.obtenerRutasBuses();
    // }
    // // Obtener lista de rutas desde la API
    // obtenerRutasBuses() {
    //     this._rutasbusesService.getList().subscribe({
    //         next: data => {
    //             this.listaRutasBuses = data;
    //         },
    //         error: e => {
    //             console.error('Error al obtener rutas de buses:', e);
    //         },
    //     });
    // }
    // // Crear o actualizar una ruta
    // onSubmit() {
    //     if (this.isEditing) {
    //         this.actualizarRuta();
    //     } else {
    //         this.crearRuta();
    //     }
    // }
    // // Crear una nueva ruta
    // crearRuta() {
    //     this._rutasbusesService
    //         .createRuta(this.formularioRutasBuses.value)
    //         .subscribe({
    //             next: () => {
    //                 this.obtenerRutasBuses();
    //                 this.formularioRutasBuses.reset();
    //             },
    //             error: e => {
    //                 console.error('Error al crear la ruta:', e);
    //             },
    //         });
    // }
    // // Editar una ruta existente
    // editRuta(ruta: RutasBuses) {
    //     this.isEditing = true;
    //     this.formularioRutasBuses.patchValue(ruta);
    // }
    // // Actualizar la ruta editada
    // actualizarRuta() {
    //     this._rutasbusesService
    //         .updateRuta(
    //             this.formularioRutasBuses.value.IdRutasBuses,
    //             this.formularioRutasBuses.value,
    //         )
    //         .subscribe({
    //             next: () => {
    //                 this.obtenerRutasBuses();
    //                 this.formularioRutasBuses.reset();
    //                 this.isEditing = false;
    //             },
    //             error: e => {
    //                 console.error('Error al actualizar la ruta:', e);
    //             },
    //         });
    // }
    // // Eliminar una ruta
    // deleteRuta(id: number) {
    //     this._rutasbusesService.deleteRuta(id).subscribe({
    //         next: () => {
    //             this.obtenerRutasBuses();
    //         },
    //         error: e => {
    //             console.error('Error al eliminar la ruta:', e);
    //         },
    //     });
    // }
    // // Eliminar ruta
    // eliminarRuta(id: number) {
    //     this._rutasbusesService.deleteRuta(id).subscribe({
    //         next: () => {
    //             this.listaRutasBuses = this.listaRutasBuses.filter(
    //                 r => r.idRutasBuses !== id,
    //             );
    //         },
    //         error: e => {
    //             console.error('Error al eliminar la ruta', e);
    //         },
    //     });
    // }
    // actualizarRutas() {
    //     const rutaActualizada = this.formularioRutasBuses.value as RutasBuses;
    //     this._rutasbusesService
    //         .updateRuta(rutaActualizada.idRutasBuses, rutaActualizada)
    //         .subscribe({
    //             next: data => {
    //                 const index = this.listaRutasBuses.findIndex(
    //                     r => r.idRutasBuses === data.idRutasBuses,
    //                 );
    //                 if (index !== -1) {
    //                     this.listaRutasBuses[index] = data;
    //                 }
    //                 this.formularioRutasBuses.reset();
    //             },
    //             error: e => {
    //                 console.error('Error al actualizar la ruta', e);
    //             },
    //         });
    // }
    // editarRuta(ruta: RutasBuses) {
    //     this.formularioRutasBuses.patchValue(ruta); // Cargar datos en el formulario para editar
    // }
    // agregarRuta() {
    //     const nuevaRuta = this.formularioRutasBuses.value as RutasBuses;
    //     this._rutasbusesService.add(nuevaRuta).subscribe({
    //         next: data => {
    //             this.listaRutasBuses.push(data);
    //             this.formularioRutasBuses.reset(); // Resetear el formulario después de agregar
    //         },
    //         error: e => {
    //             console.error('Error al agregar la ruta', e);
    //         },
    //     });
    // }
    // listaVenta: Venta[] = [];
    // formularioVenta: FormGroup;
    // isEditing: boolean = false;
    // constructor(
    //     private _ventaService: VentaService,
    //     private fb: FormBuilder,
    // ) {
    //     this.formularioVenta = this.fb.group({
    //         IdVenta: ['', Validators.required],
    //         codigoVenta: ['', Validators.required],
    //         id_Usuari
    //         Destino: ['', Validators.required],
    //         DuracionMin: ['', Validators.required],
    //         PrimeraHoraSalida: ['', Validators.required],
    //     });
    // }
    // ngOnInit(): void {
    //     this.obtenerRutasBuses();
    // }
    // // Obtener lista de rutas desde la API
    // obtenerRutasBuses() {
    //     this._rutasbusesService.getList().subscribe({
    //         next: data => {
    //             this.listaRutasBuses = data;
    //         },
    //         error: e => {
    //             console.error('Error al obtener rutas de buses:', e);
    //         },
    //     });
    // }
    // // Crear o actualizar una ruta
    // onSubmit() {
    //     if (this.isEditing) {
    //         this.actualizarRuta();
    //     } else {
    //         this.crearRuta();
    //     }
    // }
    // // Crear una nueva ruta
    // crearRuta() {
    //     this._rutasbusesService
    //         .createRuta(this.formularioRutasBuses.value)
    //         .subscribe({
    //             next: () => {
    //                 this.obtenerRutasBuses();
    //                 this.formularioRutasBuses.reset();
    //             },
    //             error: e => {
    //                 console.error('Error al crear la ruta:', e);
    //             },
    //         });
    // }
    // // Editar una ruta existente
    // editRuta(ruta: RutasBuses) {
    //     this.isEditing = true;
    //     this.formularioRutasBuses.patchValue(ruta);
    // }
    // // Actualizar la ruta editada
    // actualizarRuta() {
    //     this._rutasbusesService
    //         .updateRuta(
    //             this.formularioRutasBuses.value.IdRutasBuses,
    //             this.formularioRutasBuses.value,
    //         )
    //         .subscribe({
    //             next: () => {
    //                 this.obtenerRutasBuses();
    //                 this.formularioRutasBuses.reset();
    //                 this.isEditing = false;
    //             },
    //             error: e => {
    //                 console.error('Error al actualizar la ruta:', e);
    //             },
    //         });
    // }
    // // Eliminar una ruta
    // deleteRuta(id: number) {
    //     this._rutasbusesService.deleteRuta(id).subscribe({
    //         next: () => {
    //             this.obtenerRutasBuses();
    //         },
    //         error: e => {
    //             console.error('Error al eliminar la ruta:', e);
    //         },
    //     });
    // }
    // // Eliminar ruta
    // eliminarRuta(id: number) {
    //     this._rutasbusesService.deleteRuta(id).subscribe({
    //         next: () => {
    //             this.listaRutasBuses = this.listaRutasBuses.filter(
    //                 r => r.idRutasBuses !== id,
    //             );
    //         },
    //         error: e => {
    //             console.error('Error al eliminar la ruta', e);
    //         },
    //     });
    // }
    // actualizarRutas() {
    //     const rutaActualizada = this.formularioRutasBuses.value as RutasBuses;
    //     this._rutasbusesService
    //         .updateRuta(rutaActualizada.idRutasBuses, rutaActualizada)
    //         .subscribe({
    //             next: data => {
    //                 const index = this.listaRutasBuses.findIndex(
    //                     r => r.idRutasBuses === data.idRutasBuses,
    //                 );
    //                 if (index !== -1) {
    //                     this.listaRutasBuses[index] = data;
    //                 }
    //                 this.formularioRutasBuses.reset();
    //             },
    //             error: e => {
    //                 console.error('Error al actualizar la ruta', e);
    //             },
    //         });
    // }
    // editarRuta(ruta: RutasBuses) {
    //     this.formularioRutasBuses.patchValue(ruta); // Cargar datos en el formulario para editar
    // }
    // agregarRuta() {
    //     const nuevaRuta = this.formularioRutasBuses.value as RutasBuses;
    //     this._rutasbusesService.add(nuevaRuta).subscribe({
    //         next: data => {
    //             this.listaRutasBuses.push(data);
    //             this.formularioRutasBuses.reset(); // Resetear el formulario después de agregar
    //         },
    //         error: e => {
    //             console.error('Error al agregar la ruta', e);
    //         },
    //     });
    // }
}
