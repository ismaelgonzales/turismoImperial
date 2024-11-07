import { Component } from '@angular/core';
import { ProcesoCompraService } from '../../../services/proceso-compra.service';
import { SeatSelectionComponent } from "../seat-selection/seat-selection.component";
import { DatosPasajeroComponent } from "../datos-pasajero/datos-pasajero.component";
import { PagoComponent } from "../pago/pago.component";
import { CommonModule } from '@angular/common';
import CheckoutComponent from "../checkout/checkout.component";

@Component({
  selector: 'app-proceso-compra',
  standalone: true,
  imports: [SeatSelectionComponent, DatosPasajeroComponent, PagoComponent, CommonModule, CheckoutComponent],
  templateUrl: './proceso-compra.component.html',
  styleUrl: './proceso-compra.component.scss'
})
export class ProcesoCompraComponent {
  pasoActual: number = 0;

  constructor(private procesoCompraService: ProcesoCompraService) {}

  ngOnInit() {
    this.procesoCompraService.pasoActual$.subscribe((paso) => {
      this.pasoActual = paso;
    });
  }

  avanzar() {
    this.procesoCompraService.avanzarPaso();
  }

  retroceder() {
    this.procesoCompraService.retrocederPaso();
  }
}