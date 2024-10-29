import { Component, Output ,EventEmitter} from '@angular/core';
import { DetalladoCompraComponent } from "../../organims/detallado-compra/detallado-compra.component";
import { FooterPageComponent } from "../../atoms/footer-page/footer-page.component";
import { HeaderPageComponent } from "../../atoms/header-page/header-page.component";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [DetalladoCompraComponent, FooterPageComponent, HeaderPageComponent,CheckboxModule,FormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {
  checked: boolean = false;
  @Output() back = new EventEmitter<void>();
  @Output() complete = new EventEmitter<void>();
  onBack() {
    this.back.emit(); // Retrocede al paso anterior
  }

  onComplete() {
    this.complete.emit(); // Finaliza el proceso de compra
  }
}
