import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Op2DashComponent } from './op-2-dash.component';

describe('Op2DashComponent', () => {
  let component: Op2DashComponent;
  let fixture: ComponentFixture<Op2DashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Op2DashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Op2DashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
