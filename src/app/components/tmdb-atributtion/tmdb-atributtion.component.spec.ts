import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMDBAtributtionComponent } from './tmdb-atributtion.component';

describe('TMDBAtributtionComponent', () => {
  let component: TMDBAtributtionComponent;
  let fixture: ComponentFixture<TMDBAtributtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TMDBAtributtionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TMDBAtributtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
