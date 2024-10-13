import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDetallesComponent } from './ruta-detalles.component';

describe('RutaDetallesComponent', () => {
  let component: RutaDetallesComponent;
  let fixture: ComponentFixture<RutaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
