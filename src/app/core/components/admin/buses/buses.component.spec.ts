import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/core/components/admin/buses/buses.component.spec.ts
import { BusesComponent } from './buses.component';

describe('BusesComponent', () => {
  let component: BusesComponent;
  let fixture: ComponentFixture<BusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesComponent);
========
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
>>>>>>>> devIsmael:src/app/core/components/pages/checkout/checkout.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
