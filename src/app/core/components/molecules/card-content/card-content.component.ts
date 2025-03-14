import { Component, Input } from '@angular/core';
import { TitleComponent } from "../../atoms/title/title.component";
import { ParrafoComponent } from "../../atoms/parrafo/parrafo.component";
import { LinkComponent } from "../../atoms/link/link.component";

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [TitleComponent, ParrafoComponent, LinkComponent],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss'
})
export class CardContentComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() linkText: string = '';
  @Input() linkUrl: string = '#';
  @Input() linkClass : string = '';
}
