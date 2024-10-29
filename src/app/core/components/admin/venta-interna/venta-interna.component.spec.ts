import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaInternaComponent } from './venta-interna.component';

describe('VentaInternaComponent', () => {
  let component: VentaInternaComponent;
  let fixture: ComponentFixture<VentaInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaInternaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
