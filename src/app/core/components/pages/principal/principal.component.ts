import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { HeaderPageComponent } from '../../atoms/header-page/header-page.component';
import { Swiper } from 'swiper/types';
import { SlideCorruselleComponent } from '../../molecules/slide-corruselle/slide-corruselle.component';
import { IImageSlide } from '../../../interfaces/global/generics.interface';
import { SearchBarTravelComponent } from '../../organims/search-bar-travel/search-bar-travel.component';
import { CardComponent } from '../../molecules/card/card.component';
import { Card1Component } from '../../molecules/card1/card1.component';
import { Card2Component } from '../../molecules/card2/card2.component';
import { Card3Component } from '../../molecules/card3/card3.component';
import { RobotComponent } from '../../organims/robot/robot.component';
import { IndicatorsComponent } from '../../organims/indicators/indicators.component';
import { FooterPageComponent } from '../../atoms/footer-page/footer-page.component';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        HeaderPageComponent,
        HeaderPageComponent,
        SlideCorruselleComponent,
        SearchBarTravelComponent,
        CardComponent,
        Card1Component,
        Card2Component,
        Card3Component,
        RobotComponent,
        IndicatorsComponent,
        FooterPageComponent,
    ],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
    public imagesSlide: IImageSlide[] = [
        {
            imgRoute: '/img/imperial/slider/slide1.jpg',
            alt: 'Bus1',
        },
        {
            imgRoute: '/img/imperial/slider/slide2.jpg',
            alt: 'Bus2',
        },
        {
            imgRoute: '/img/imperial/slider/slide3.jpg',
            alt: 'Bus3',
        },
        {
            imgRoute: '/img/imperial/slider/slide4.jpg',
            alt: 'Bus4',
        },
        {
            imgRoute: '/img/imperial/slider/slide5.jpg',
            alt: 'Bus5',
        },
        {
            imgRoute: '/img/slider/slide3.jpg',
            alt: 'Bus6',
        },
    ];
}
