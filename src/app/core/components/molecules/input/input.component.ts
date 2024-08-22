import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() label : string = '';
  @Input() idInput : string = ''; 
  @Input() idSmall : string = ''; 
  @Input() type : 'text' | 'email' | 'password' = 'text';
  @Input() smallEnabled : boolean = false;
  @Input() smallText : string = ''
  @Input() inputSize : 'xs' | 'sm' | 'xl' | '2xl' = 'sm';

}
