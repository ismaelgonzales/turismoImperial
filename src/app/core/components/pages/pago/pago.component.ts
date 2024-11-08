import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DetalladoCompraComponent } from "../../organims/detallado-compra/detallado-compra.component";
import { FooterPageComponent } from "../../atoms/footer-page/footer-page.component";
import { HeaderPageComponent } from "../../atoms/header-page/header-page.component";
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators  } from '@angular/forms';
import CheckoutComponent from "../checkout/checkout.component";
import { CommonModule } from '@angular/common';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { IComprador } from '../../../models/compraFinal';
@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [DetalladoCompraComponent, FooterPageComponent, HeaderPageComponent, CheckboxModule, FormsModule, CheckoutComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent implements OnInit {
  checked: boolean = false;
  @Output() back = new EventEmitter<void>();
  @Output() complete = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();
  tipoComprobante: string = '';
  compradorForm!: FormGroup;
  
  
  constructor(

    
    private seleccionAsientosService: SeleccionAsientosService,
    private fb: FormBuilder

  ) { }
  ngOnInit(): void {
    // Inicializamos el formulario
    this.compradorForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      tipoDoc: [''],
      ruc: ['', Validators.required],
      razonSocial: ['', Validators.required],
      direccion: ['', Validators.required],
      total: [0]
    });

    // Suscribirse a los cambios del formulario para actualizar el objeto en tiempo real
    this.compradorForm.valueChanges.subscribe((datos: IComprador) => {
      this.seleccionAsientosService.setCompraFinal([datos]);
    });
    this.seleccionAsientosService.compraFinal$.subscribe((compra) => {
      console.log('Datos de la compra:', compra); // Aquí ves el valor actual de `compraFinal`
    });
  }

  onBack() {
    this.back.emit(); // Retrocede al paso anterior
  }

  onComplete() {
    if (this.compradorForm.valid) {
      // Emitir datos del formulario
      this.seleccionAsientosService.setCompraFinal([this.compradorForm.value]);
      this.complete.emit(); // Emitimos el evento de finalización
    } else {
      console.log('Formulario inválido');
    }
  }

  onContinue() {
    this.continue.emit(); // Avanza al siguiente paso
  }

  setCompraFinal(datos: IComprador){

  }
 
}

// this.zapatillaForm = this.formBuilder.group({
//   nombre:[this.zapatilla.nombre,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
//   marca:[this.zapatilla.marca,[Validators.required]],
//   precio:[this.zapatilla.precio,[Validators.required,Validators.min(0)]],
//   color:[this.zapatilla.color,[Validators.required]],
//   stock:[this.zapatilla.stock,[Validators.required]],
// });