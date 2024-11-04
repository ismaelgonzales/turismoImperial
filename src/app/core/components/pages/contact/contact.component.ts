import { Component, OnInit } from '@angular/core';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [HeaderPageComponent, FooterPageComponent, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private contactService: ContactService,
        private toastr: ToastrService,
    ) {
        this.contactForm = this.fb.group({
            email: new FormControl('', [Validators.required]),
            subject: new FormControl('', [Validators.required]),
            message: new FormControl('', [Validators.required]),
        });
    }
    async onSubmit() {
        try {
            await this.contactService.addMessage(this.contactForm.value);
            this.toastr.success('Mensaje enviado con éxito');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);

                if (error.message.includes('límite de 2 mensajes por día')) {
                    this.toastr.warning(
                        'Usted ya envió sus dos mensajes diarios, vuelva más tarde',
                    );
                } else {
                    this.toastr.error(
                        'Error al enviar el mensaje. Inténtelo de nuevo.',
                    );
                }
            } else {
                this.toastr.error(
                    'Ocurrió un error desconocido. Inténtelo de nuevo.',
                );
                console.error('Error desconocido:', error);
            }
        }
    }

    ngOnInit(): void {
        this.contactService.getMessage().subscribe(contact => {
            console.log(contact);
        });
    }
}
