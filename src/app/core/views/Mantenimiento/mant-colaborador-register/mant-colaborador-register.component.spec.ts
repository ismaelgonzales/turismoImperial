import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantColaboradorRegisterComponent } from './mant-colaborador-register.component';

describe('MantColaboradorRegisterComponent', () => {
  let component: MantColaboradorRegisterComponent;
  let fixture: ComponentFixture<MantColaboradorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantColaboradorRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantColaboradorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
