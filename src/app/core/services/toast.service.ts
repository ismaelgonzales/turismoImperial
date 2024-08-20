import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private messageService = inject(MessageService);

    showSuccess(summary: string, detail: string) {
        this.messageService.add({ severity: 'success', summary, detail });
    }

    showWarn(summary: string, detail: string) {
        this.messageService.add({ severity: 'warn', summary, detail });
    }

    showError(summary: string, detail: string) {
        this.messageService.add({ severity: 'error', summary, detail });
    }
}
