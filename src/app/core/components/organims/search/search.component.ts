import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterService } from '../../../services/master.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        DatePipe,
        RouterLink,
        CommonModule,
        HeaderPageComponent,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
    locations$: Observable<any[]> = new Observable<any[]>();
    masterSrv = inject(MasterService);
    busList: any[] = [];

    searchObj: any = {
        fromLocation: '',
        toLocation: '',
        travelDate: '',
    };

    ngOnInit(): void {
        this.getAllLocations();
    }

    getAllLocations() {
        this.locations$ = this.masterSrv.getLocations();
    }

    onSearch() {
        const { fromLocation, toLocation, travelDate } = this.searchObj;
        this.masterSrv
            .searchBus(fromLocation, toLocation, travelDate)
            .subscribe((res: any) => {
                this.busList = res;
            });
    }
}
