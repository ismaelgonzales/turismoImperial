import { Component, Input } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'app-input-calendar',
    standalone: true,
    imports: [CalendarModule],
    templateUrl: './input-calendar.component.html',
    styleUrl: './input-calendar.component.scss',
})
export class InputCalendarComponent {
    @Input() labelIn: string = '';
    @Input() borderTopLeft: boolean = false;
    @Input() borderTopRight: boolean = false;
    @Input() borderBottomLeft: boolean = false;
    @Input() borderBottomRight: boolean = false;
    @Input() borderEnabled: boolean = false;
    @Input() padding: string = '';

    public borderRadius: string = '15px';

    getPadding(): string {
        switch (this.padding) {
            case 'xl':
                return '40px';
            case 'lg':
                return '30px';
            case 'md':
                return '20px';
            case 'sm':
                return '10px';
            default:
                return '0';
        }
    }
}
