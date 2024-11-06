import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/core/models/pages/shared/ui/model/model.component.spec.ts
import { ModelComponent } from './model.component';

describe('ModelComponent', () => {
  let component: ModelComponent;
  let fixture: ComponentFixture<ModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelComponent);
========
import { PagoComponent } from './pago.component';

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComponent);
>>>>>>>> devIsmael:src/app/core/components/pages/pago/pago.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
