import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarTravelComponent } from './search-bar-travel.component';

describe('SearchBarTravelComponent', () => {
  let component: SearchBarTravelComponent;
  let fixture: ComponentFixture<SearchBarTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
