import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesClientComponent } from './purchases-client.component';

describe('PurchasesClientComponent', () => {
  let component: PurchasesClientComponent;
  let fixture: ComponentFixture<PurchasesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
