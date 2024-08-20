import { Component } from '@angular/core';
import { IHeaderOptions } from '../../../interfaces';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {

  public Options : IHeaderOptions[] = [
    {
      name : 'Español',
      type : 'dropdown',
      options : [{name : 'Español', cod : 'ES'}, {name : 'English', cod : 'EN'}]
    },
    {
      name : 'Contáctanos',
      type : 'button',
      route : '',
    },
    {
      name : 'Iniciar sesión',
      type : 'button',
      route : ''
    }
  ]
}
