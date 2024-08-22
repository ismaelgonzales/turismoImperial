import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, AfterViewInit, signal } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { IImageSlide } from '../../../interfaces/global/generics.interface';

@Component({
  selector: 'app-slide-corruselle',
  standalone: true,
  imports: [],
  templateUrl: './slide-corruselle.component.html',
  styleUrls: ['./slide-corruselle.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlideCorruselleComponent implements AfterViewInit {
  @Input() loop: boolean = false;
  @Input() navigation: boolean = false;
  @Input() slidesPerView: number = 1;
  @Input() pagination: boolean = false;
  @Input() autoPlayEnabled: boolean = false;
  @Input() autoPlayDelay: number = 0;
  @Input() images: IImageSlide[] = [];
  @Input() slideDimension: "xs" | 'sm' | 'xl' | '2xl' = 'xs';

  private swiperElement = signal<SwiperContainer | null>(null);

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const swiperElementConstructor = document.querySelector('swiper-container');
      const autoPlayOptions = this.setAutoPlayOptions();
      const swiperOptions: SwiperOptions = {
        slidesPerView: this.slidesPerView,
        loop: this.loop,
        navigation: this.navigation,
        pagination: this.pagination,
        autoplay: autoPlayOptions
      };
      if (swiperElementConstructor) {
        Object.assign(swiperElementConstructor, swiperOptions);
        this.swiperElement.set(swiperElementConstructor as SwiperContainer);
        this.swiperElement()?.initialize();
      }
    }
  }

  private setAutoPlayOptions(): object | boolean {
    return this.autoPlayEnabled ? { delay: this.autoPlayDelay } : false;
  }
}
