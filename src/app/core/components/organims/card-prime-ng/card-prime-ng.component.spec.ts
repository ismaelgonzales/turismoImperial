import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrimeNgComponent } from './card-prime-ng.component';

describe('CardPrimeNgComponent', () => {
  let component: CardPrimeNgComponent;
  let fixture: ComponentFixture<CardPrimeNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPrimeNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPrimeNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
