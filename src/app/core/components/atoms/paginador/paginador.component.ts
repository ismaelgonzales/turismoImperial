import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paginador',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './paginador.component.html',
    styleUrl: './paginador.component.scss',
})
export class PaginadorComponent {
    @Input() items: any[] = [];
    @Input() pageSize: number = 8; // Número de elementos por página
    @Output() pageChange = new EventEmitter<any[]>();

    currentPage: number = 1;
    totalPages: number = 0;

    ngOnChanges() {
        this.updatePagination();
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.items.length / this.pageSize);
        this.emitCurrentPageItems();
    }

    emitCurrentPageItems() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pageChange.emit(this.items.slice(startIndex, endIndex));
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.emitCurrentPageItems();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.emitCurrentPageItems();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.emitCurrentPageItems();
        }
    }
}
