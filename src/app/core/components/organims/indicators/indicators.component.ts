import { Component, Input } from '@angular/core';
import { IconsComponent } from '../../atoms/icons/icons.component';
import { IconNames } from '../../../enum';

@Component({
  selector: 'app-indicators',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  public IconNames = IconNames; 

  @Input({required : true}) svg : string =''
  @Input({required : true}) title : string = '';
  @Input({required : false}) subtitle : string = '';
}
