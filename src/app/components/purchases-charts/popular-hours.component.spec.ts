import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularHoursComponent } from './popular-hours.component';

describe('PopularHoursComponent', () => {
  let component: PopularHoursComponent;
  let fixture: ComponentFixture<PopularHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
