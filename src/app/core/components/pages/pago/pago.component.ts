import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DetalladoCompraComponent } from "../../organims/detallado-compra/detallado-compra.component";
import { FooterPageComponent } from "../../atoms/footer-page/footer-page.component";
import { HeaderPageComponent } from "../../atoms/header-page/header-page.component";
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import CheckoutComponent from "../checkout/checkout.component";
import { CommonModule } from '@angular/common';
import { SeleccionAsientosService } from '../../../services/seleccion-asientos.service';
import { IComprador } from '../../../models/compraFinal';
import { ComprasService } from '../../../services/compras.service'; // Asegúrate de importar el servicio correctamente

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [DetalladoCompraComponent, FooterPageComponent, HeaderPageComponent, CheckboxModule, FormsModule, CheckoutComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  checked: boolean = false;
  @Output() back = new EventEmitter<void>();
  @Output() complete = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();
  tipoComprobante: string = '';
  compradorForm!: FormGroup;
  isFormValid: boolean = false;

  constructor(
    private seleccionAsientosService: SeleccionAsientosService,
    private fb: FormBuilder,
    private comprasService: ComprasService // Inyecta el servicio aquí
  ) { }

  ngOnInit(): void {
    // Inicializamos el formulario
    this.compradorForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      tipoDoc: ['', Validators.required],
      ruc: [''],
      razonSocial: [''],
      direccion: [''],
      total: [0]
    });

    // Validaciones condicionales
    this.compradorForm.get('tipoDoc')?.valueChanges.subscribe(value => {
      if (value === 'Factura') {
        this.compradorForm.get('ruc')?.setValidators(Validators.required);
        this.compradorForm.get('razonSocial')?.setValidators(Validators.required);
        this.compradorForm.get('direccion')?.setValidators(Validators.required);
      } else {
        this.compradorForm.get('ruc')?.clearValidators();
        this.compradorForm.get('razonSocial')?.clearValidators();
        this.compradorForm.get('direccion')?.clearValidators();
      }
      this.compradorForm.get('ruc')?.updateValueAndValidity();
      this.compradorForm.get('razonSocial')?.updateValueAndValidity();
      this.compradorForm.get('direccion')?.updateValueAndValidity();
    });

    // Suscribirse a cambios en el formulario
    this.compradorForm.valueChanges.subscribe((datos: IComprador) => {
      this.seleccionAsientosService.setCompraFinal([datos]);
      this.isFormValid = this.compradorForm.valid;
    });

    this.seleccionAsientosService.compraFinal$.subscribe((compra) => {
      console.log('Datos de la compra:', compra);
    });
  }

  onBack() {
    this.back.emit(); // Retrocede al paso anterior
  }

  onComplete() {
    // Acción de completar (si es necesario)
  }

  onContinue() {
    if (this.compradorForm.valid) {
      const compraData = {
        correoElectronico: this.compradorForm.value.correo,
        celular: this.compradorForm.value.celular,
        ruc: this.compradorForm.value.ruc,
        razonSocial: this.compradorForm.value.razonSocial,
        direccion: this.compradorForm.value.direccion,
        total: this.compradorForm.value.total
      };
  
      // Asegúrate de enviar los datos dentro de "data" como se hace en Postman
      this.comprasService.postCompra({ data: compraData }).subscribe(
        response => {
          console.log('Compra registrada con éxito:', response);
          this.continue.emit();
        },
        error => {
          console.error('Error al registrar la compra:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  
  
}
