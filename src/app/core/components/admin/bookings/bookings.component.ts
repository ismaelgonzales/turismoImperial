import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MasterService } from '../../../services/master.service';

@Component({
    selector: 'app-bookings',
    standalone: true,
    imports: [CommonModule, DatePipe],
    templateUrl: './bookings.component.html',
    styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
    loggedData: any;
    masterSrv = inject(MasterService);
    bookingList = signal<any[]>([]);

    constructor() {
        const loggedData = localStorage.getItem('redBusUser');
        if (loggedData) {
            this.loggedData = JSON.parse(loggedData);
        }
    }

    ngOnInit(): void {
        this.getBookings();
    }

    getBookings() {
        this.masterSrv
            .getAllBusBookings(this.loggedData.userId)
            .subscribe((Res: any) => {
                this.bookingList.set(Res);
            });
    }
}
