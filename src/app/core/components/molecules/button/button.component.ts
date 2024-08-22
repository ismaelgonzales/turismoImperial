import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() borderTopLeft : boolean = false;
  @Input() borderTopRight : boolean = false;
  @Input() borderBottomLeft: boolean = false;
  @Input() borderBottomRight: boolean = false;
  @Input() borderEnabled : boolean = false;
  @Input() label : string = '';

  public borderRadius : string = '15px';

}
