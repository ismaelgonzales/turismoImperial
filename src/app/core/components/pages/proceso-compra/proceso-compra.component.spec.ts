import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/core/models/pages/buses-form/buses-form.component.spec.ts
import { BusesFormComponent } from './buses-form.component';

describe('BusesFormComponent', () => {
  let component: BusesFormComponent;
  let fixture: ComponentFixture<BusesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesFormComponent);
========
import { ProcesoCompraComponent } from './proceso-compra.component';

describe('ProcesoCompraComponent', () => {
  let component: ProcesoCompraComponent;
  let fixture: ComponentFixture<ProcesoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoCompraComponent);
>>>>>>>> devIsmael:src/app/core/components/pages/proceso-compra/proceso-compra.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
