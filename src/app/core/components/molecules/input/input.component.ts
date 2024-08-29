import { Component, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [InputTextModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
    @Input() label: string = '';
    @Input() idInput: string = '';
    @Input() idSmall: string = '';
    @Input() type: 'text' | 'email' | 'password' = 'text';
    @Input() smallEnabled: boolean = false;
    @Input() smallText: string = '';
    @Input() inputSize: 'xs' | 'sm' | 'xl' | '2xl' = 'sm';
    @Input() set colorLabelInput(
        color: 'principal' | 'secondary' | 'white' | 'black',
    ) {
        switch (color) {
            case 'principal':
                this.colorLabel = 'text-red-500';
                break;
            case 'secondary' : 
                this.colorLabel = 'text-[#f2a516]'
                break;
            case 'white':
                this.colorLabel = 'text-white';
                break;
            case 'black':
                this.colorLabel = 'text-black';
                break;
        }
    }

    public colorLabel: string = '';

    ngOnInit(): void {
        this.selectColorLabel(this.colorLabel);
    }

    private selectColorLabel(colorLabel: string): string {
        switch (colorLabel) {
            case 'principal':
                return 'bg-red';
            default:
                return 'bg-white';
        }
    }
}
