import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoCompraService {
  private pasoActualSubject = new BehaviorSubject<number>(0); // Paso inicial

  pasoActual$ = this.pasoActualSubject.asObservable();

  avanzarPaso() {
    this.pasoActualSubject.next(this.pasoActualSubject.value + 1); // Incrementa el paso actual
  }

  retrocederPaso() {
    if (this.pasoActualSubject.value > 0) {
      this.pasoActualSubject.next(this.pasoActualSubject.value - 1); // Decrementa el paso actual
    }
  }
}