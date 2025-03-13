import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { HeaderPageComponent } from '../../organims/header-page/header-page.component';
import { SlideCorruselleComponent } from '../../molecules/slide-corruselle/slide-corruselle.component';
import { IImageSlide } from '../../../interfaces/global/generics.interface';
import { SearchBarTravelComponent } from '../../organims/search-bar-travel/search-bar-travel.component';
import { CardComponent } from '../../organims/card/card.component';
import { FooterPageComponent } from '../../organims/footer-page/footer-page.component';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        HeaderPageComponent,
        HeaderPageComponent,
        SlideCorruselleComponent,
        SearchBarTravelComponent,
        CardComponent,
        FooterPageComponent,
    ],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
    public imagesSlide: IImageSlide[] = [
        {
            imgRoute:
                'https://res.cloudinary.com/dd6ferfis/image/upload/v1728709354/slide1_kydgds.jpg',
            alt: 'Bus1',
        },
        {
            imgRoute:
                'https://res.cloudinary.com/dd6ferfis/image/upload/v1728784240/slide2_giduxc.jpg',
            alt: 'Bus2',
        },
        {
            imgRoute:
                'https://res.cloudinary.com/dd6ferfis/image/upload/v1728786636/slide3_estnf9.jpg',
            alt: 'Bus3',
        },
        {
            imgRoute:
                'https://res.cloudinary.com/dd6ferfis/image/upload/v1728786647/slide4_ko77ua.jpg',
            alt: 'Bus4',
        },
        {
            imgRoute:
                'https://res.cloudinary.com/dd6ferfis/image/upload/v1728786659/slide5_zyevlv.jpg',
            alt: 'Bus5',
        },
        {
            imgRoute:
                'https://res.cloudinary.com/dd6ferfis/image/upload/v1728787647/slide6_x3thzt.jpg',
            alt: 'Bus6',
        },
    ];
}
