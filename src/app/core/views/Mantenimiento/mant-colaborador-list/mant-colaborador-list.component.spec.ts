import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantColaboradorListComponent } from './mant-colaborador-list.component';

describe('MantColaboradorListComponent', () => {
  let component: MantColaboradorListComponent;
  let fixture: ComponentFixture<MantColaboradorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantColaboradorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantColaboradorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
