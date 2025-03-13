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
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() linkText: string = '';
  @Input() linkUrl: string = '#';
}
