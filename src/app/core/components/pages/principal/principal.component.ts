import { Component } from '@angular/core';
import { HeaderPageComponent } from "../../atoms/header-page/header-page.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HeaderPageComponent, HeaderPageComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
