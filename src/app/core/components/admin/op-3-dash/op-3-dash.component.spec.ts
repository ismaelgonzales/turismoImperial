import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Op3DashComponent } from './op-3-dash.component';

describe('Op3DashComponent', () => {
  let component: Op3DashComponent;
  let fixture: ComponentFixture<Op3DashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Op3DashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Op3DashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
