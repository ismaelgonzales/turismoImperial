import { Component } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-seats',
    standalone: true,
    imports: [HeaderPageComponent, CommonModule],
    templateUrl: './seats.component.html',
    styleUrl: './seats.component.scss',
})
export class SeatsComponent {
    seats = [
        { number: 1, selected: false },
        { number: 2, selected: false },
        { number: 3, selected: false },
        // Agrega más asientos según sea necesario
    ];

    selectedSeatsCount = 0;

    toggleSeat(seat: any) {
        seat.selected = !seat.selected;
        this.selectedSeatsCount += seat.selected ? 1 : -1;
    }
}
