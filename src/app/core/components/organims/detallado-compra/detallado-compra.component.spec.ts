import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalladoCompraComponent } from './detallado-compra.component';

describe('DetalladoCompraComponent', () => {
  let component: DetalladoCompraComponent;
  let fixture: ComponentFixture<DetalladoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalladoCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalladoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
