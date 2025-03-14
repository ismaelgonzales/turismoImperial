import { Component, Input } from '@angular/core';
import { ImageComponent } from "../../atoms/image/image.component";
import { CardContentComponent } from "../../molecules/card-content/card-content.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ImageComponent, CardContentComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() imageClass : string = 'w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover' ;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() linkText: string = '';
  @Input() linkUrl: string = '#';
  @Input() linkClass: string = 'text-red-600 hover:underline text-sm sm:text-base md:text-lg';
}
