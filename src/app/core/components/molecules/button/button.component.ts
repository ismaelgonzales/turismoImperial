import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    @Input() borderTopLeft: boolean = false;
    @Input() borderTopRight: boolean = false;
    @Input() borderBottomLeft: boolean = false;
    @Input() borderBottomRight: boolean = false;
    @Input() borderEnabled: boolean = false;
    @Input() label: string = '';
    @Input() set colorBgButton(
        color: 'principal' | 'secondary' | 'white' | 'black',
    ) {
        switch (color) {
            case 'principal':
                this.colorBg = 'bg-red-500 text-white';
                break;
            case 'secondary':
                this.colorBg = 'bg-[#f2a516] text-black';
                break;
            case 'white':
                this.colorBg = 'bg-white text-black';
                break;
            case 'black':
                this.colorBg = 'bg-black text-white';
                break;
        }
    }
    public colorBg: string = '';
    public borderRadius: string = '15px';
}
