import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Op4DashComponent } from './op-4-dash.component';

describe('Op4DashComponent', () => {
  let component: Op4DashComponent;
  let fixture: ComponentFixture<Op4DashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Op4DashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Op4DashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
