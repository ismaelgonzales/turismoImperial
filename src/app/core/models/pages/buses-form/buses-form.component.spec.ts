import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
