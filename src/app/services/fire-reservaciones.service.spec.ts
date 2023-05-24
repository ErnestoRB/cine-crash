import { TestBed } from '@angular/core/testing';

import { FireReservacionesService } from './fire-reservaciones.service';

describe('FireReservacionesService', () => {
  let service: FireReservacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireReservacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
