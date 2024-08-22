import { Component } from '@angular/core';
import { InputComponent } from '../../molecules/input/input.component';
import { DropdownComponent } from '../../molecules/dropdown/dropdown.component';
import { InputCalendarComponent } from '../../molecules/input-calendar/input-calendar.component';
import { ButtonComponent } from '../../molecules/button/button.component';

@Component({
  selector: 'app-search-bar-travel',
  standalone: true,
  imports: [InputComponent, DropdownComponent, InputCalendarComponent, ButtonComponent],
  templateUrl: './search-bar-travel.component.html',
  styleUrl: './search-bar-travel.component.scss'
})
export class SearchBarTravelComponent {

}
