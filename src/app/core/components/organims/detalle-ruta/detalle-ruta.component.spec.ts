import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRutaComponent } from './detalle-ruta.component';

describe('DetalleRutaComponent', () => {
  let component: DetalleRutaComponent;
  let fixture: ComponentFixture<DetalleRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
