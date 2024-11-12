import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { DetalladoCompraComponent } from '../../organims/detallado-compra/detallado-compra.component';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { DniService } from '../../../services/dni.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-datos-pasajero',
    standalone: true,
    imports: [
        HeaderPageComponent,
        CommonModule,
        DetalladoCompraComponent,
        FooterPageComponent,
        FormsModule,
        CommonModule
    ],
    templateUrl: './datos-pasajero.component.html',
    styleUrls: ['./datos-pasajero.component.scss'],
})
export class DatosPasajeroComponent implements OnInit {
    pasajerosSeleccionados: any[] = [];
    private pasajerosSubscription: Subscription = new Subscription();
    dniArray: string[] = []; // Array para almacenar DNIs
    datosPropietario: any[] = Array(this.pasajerosSeleccionados.length).fill({});
    datosCompletos: boolean = false; // Estado para habilitar/deshabilitar el botón
    @Output() continue = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();

    constructor(
        private seleccionAsientosService: SeleccionAsientosService,
        private dniService: DniService,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.pasajerosSubscription = this.seleccionAsientosService.pasajeros$.subscribe(pasajeros => {
            this.pasajerosSeleccionados = pasajeros;
            console.log('Pasajeros seleccionados:', this.pasajerosSeleccionados);
        });
    }

    updatePropietario(index: number, field: string, value: string) {
        if (!this.pasajerosSeleccionados[index].propietario) {
            this.pasajerosSeleccionados[index].propietario = {};
        }
        this.pasajerosSeleccionados[index].propietario[field] = value;
        this.seleccionAsientosService.updatePropietarioDatos(index, this.pasajerosSeleccionados[index].propietario);
        this.checkFormCompletion(); // Verificar si los datos están completos
    }

    buscarDni(index: number) {
        const dni = this.dniArray[index];
        if (dni) {
            this.dniService.obtenerDatosPorDni(dni).subscribe(
                response => {
                    if (response.success) {
                        this.datosPropietario[index] = response.data;
                        this.seleccionAsientosService.updatePropietarioDatos(index, response.data);
                        console.log('Datos del propietario actualizados en el servicio:', response.data);
                        
                        this.checkFormCompletion(); // Verificar si los datos están completos
                        this.cdr.detectChanges(); // Forzar la detección de cambios
                    } else {
                        this.toastr.error('Error al obtener datos.');
                        console.error('Error al obtener datos:', response);
                    }
                },
                error => {
                    this.toastr.error('Error de conexión.');
                    console.error('Error de conexión:', error);
                }
            );
        } else {
            this.toastr.warning('Por favor, ingresa un DNI válido.');
        }
    }

    ngOnDestroy() {
        this.pasajerosSubscription.unsubscribe();
    }

    onContinue() {
        if (this.datosCompletos) {
            this.continue.emit(); // Avanza al siguiente paso
        } else {
            this.showValidationErrors(); // Muestra errores de validación
        }
    }

    onBack() {
        this.back.emit(); // Retrocede al paso anterior
    }

    formIsValid(): boolean {
        return this.pasajerosSeleccionados.every(pasajero => {
            if (pasajero.tipoDocumento === 'DNI') {
                return (
                    pasajero.propietario?.numeroDocumento &&
                    pasajero.propietario?.nombres &&
                    pasajero.propietario?.apellidos
                );
            } else if (pasajero.tipoDocumento === 'Pasaporte' || pasajero.tipoDocumento === 'Cédula de identidad') {
                return (
                    pasajero.propietario?.numeroDocumento &&
                    pasajero.propietario?.nombres &&
                    pasajero.propietario?.apellidos
                );
            } else if (pasajero.tipoDocumento === 'Carnet de extranjería') {
                return (
                    pasajero.propietario?.numeroDocumento &&
                    pasajero.propietario?.nombres &&
                    pasajero.propietario?.apellidos
                );
            }
            return false; // En caso de que no coincida con ningún tipo de documento válido
        });
    }

    // Verifica si los datos de todos los pasajeros están completos
    checkFormCompletion() {
        this.datosCompletos = this.formIsValid();
        this.cdr.detectChanges(); // Forzar la detección de cambios
    }

    showValidationErrors() {
        this.pasajerosSeleccionados.forEach((pasajero, index) => {
            if (!pasajero.tipoDocumento) {
                this.toastr.error(`Seleccione el tipo de documento para el pasajero ${index + 1}`);
            }
            if (!pasajero.propietario?.numeroDocumento) {
                this.toastr.error(`Ingrese el número de documento para el pasajero ${index + 1}`);
            }
            if (!pasajero.propietario?.nombres) {
                this.toastr.error(`Ingrese los nombres para el pasajero ${index + 1}`);
            }
            if (!pasajero.propietario?.apellidos) {
                this.toastr.error(`Ingrese los apellidos para el pasajero ${index + 1}`);
            }
        });
    }
}
