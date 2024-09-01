import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [DropdownModule],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
    @Input() options: any[] = [];
    @Input() optionLabel: string = '';
    @Input() formControlName: string = '';
    @Input() checkMark: boolean = false;
    @Input() showClear: boolean = false;
    @Input() placeHolder: string = '';
    @Input() borderTopLeft: boolean = false;
    @Input() borderTopRight: boolean = false;
    @Input() borderBottomLeft: boolean = false;
    @Input() borderBottomRight: boolean = false;
    @Input() borderEnabled: boolean = false;
    @Input() padding: string = '';
    @Input() labelIn: string | undefined;

    public borderRadius: string = '15px';

    getPadding(): string {
        switch (this.padding) {
            case 'xl':
                return '40px';
            case 'lg':
                return '30px';
            case 'md':
                return '22px';
            case 'sm':
                return '10px';
            default:
                return '0';
        }
    }
}
