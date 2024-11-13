import { Component, inject } from '@angular/core';
import { ICartStore } from '../../../models/carrito.compras';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { CheckoutService } from '../../../services/checkout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports :[CommonModule],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  
  cartStore = inject(ICartStore);
  private readonly _checkoutSvc = inject(CheckoutService);

    onProceedToPay(): void {
        this._checkoutSvc.onProceedToPay(this.cartStore.products());
    }

    removeItem(id: number): void {
        this.cartStore.removeFromCart(id);
    }

  clearAll(): void {
    this.cartStore.clearCart();
  }

  // Función para descargar el PDF
  downloadPDF() {
    const element = document.querySelector('section') as HTMLElement;
  
    // Usar html2canvas para convertir el contenido a imagen
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');  // Genera una imagen en base64
  
      const pdf = new jspdf.jsPDF();
  
      const pageWidth = pdf.internal.pageSize.width; // Ancho de la página en mm
      const pageHeight = pdf.internal.pageSize.height; // Altura de la página en mm
  
      const imgWidth = canvas.width; // Ancho de la imagen (en píxeles)
      const imgHeight = canvas.height; // Altura de la imagen (en píxeles)
  
      // Calcular la relación de aspecto de la imagen
      const aspectRatio = imgWidth / imgHeight;
  
      // Ajuste de la imagen al tamaño de la página manteniendo la proporción
      let pdfWidth = pageWidth - 20; // Un margen de 10mm de cada lado
      let pdfHeight = pdfWidth / aspectRatio; // Mantener la proporción
  
      // Si la altura de la imagen supera el tamaño de la página, ajustamos la altura
      if (pdfHeight > pageHeight - 20) {
        pdfHeight = pageHeight - 20;
        pdfWidth = pdfHeight * aspectRatio; // Ajustamos el ancho proporcionalmente
      }
  
      // Agregar la imagen al PDF
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight); // 10mm de margen desde arriba y izquierda
  
      // Guardar el archivo PDF
      pdf.save('reserva.pdf');
    });
  }
  
  
}
