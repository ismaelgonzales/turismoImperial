import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadasFormComponent } from './paradas-form.component';

describe('ParadasFormComponent', () => {
  let component: ParadasFormComponent;
  let fixture: ComponentFixture<ParadasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParadasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParadasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
