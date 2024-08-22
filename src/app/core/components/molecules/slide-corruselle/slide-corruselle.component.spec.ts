import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCorruselleComponent } from './slide-corruselle.component';

describe('SlideCorruselleComponent', () => {
  let component: SlideCorruselleComponent;
  let fixture: ComponentFixture<SlideCorruselleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideCorruselleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideCorruselleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
