import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { Swiper } from 'swiper/types';
import { SlideCorruselleComponent } from '../../molecules/slide-corruselle/slide-corruselle.component';
import { IImageSlide } from '../../../interfaces/global/generics.interface';
import { SearchBarTravelComponent } from '../../organims/search-bar-travel/search-bar-travel.component';
import { CardComponent } from '../../molecules/card/card.component';
import { RobotComponent } from '../../organims/robot/robot.component';
import { IndicatorsComponent } from '../../organims/indicators/indicators.component';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        HeaderPageComponent,
        HeaderPageComponent,
        SlideCorruselleComponent,
        SearchBarTravelComponent,
        CardComponent,
        RobotComponent,
        IndicatorsComponent,
    ],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
    public imagesSlide: IImageSlide[] = [
        {
            imgRoute: '/img/slider/slide3.jpg',
            alt: 'Bus1',
        },
        {
            imgRoute: '/img/slider/slide4.jpg',
            alt: 'Bus2',
        },
    ];
}
