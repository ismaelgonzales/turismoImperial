import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { HeaderPageComponent } from "../../atoms/header-page/header-page.component";
import { Swiper } from 'swiper/types';
import { SlideCorruselleComponent } from '../../molecules/slide-corruselle/slide-corruselle.component';
import { IImageSlide } from '../../../interfaces/global/generics.interface';
import { SearchBarTravelComponent } from '../../organims/search-bar-travel/search-bar-travel.component';
import { CardComponent } from '../../molecules/card/card.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HeaderPageComponent, HeaderPageComponent, SlideCorruselleComponent, SearchBarTravelComponent, CardComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
  public imagesSlide : IImageSlide[] = [
    {
      imgRoute : '/img/slider/slide1.jpeg',
      alt : 'Bus1'
    },
    {
      imgRoute : '/img/slider/slide2.jpg',
      alt : 'Bus2'
    }
  ]
}
