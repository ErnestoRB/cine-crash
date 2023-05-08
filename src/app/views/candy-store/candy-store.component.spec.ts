import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyStoreComponent } from './candy-store.component';

describe('CandyStoreComponent', () => {
  let component: CandyStoreComponent;
  let fixture: ComponentFixture<CandyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandyStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
