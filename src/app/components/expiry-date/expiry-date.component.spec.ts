import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryDateComponent } from './expiry-date.component';

describe('ExpiryDateComponent', () => {
  let component: ExpiryDateComponent;
  let fixture: ComponentFixture<ExpiryDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiryDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
