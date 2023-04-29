import { TestBed } from '@angular/core/testing';

import { TMDBService } from './tmdb.service';
import { HttpClient } from '@angular/common/http';
import { from, of } from 'rxjs';
import { PaginationResponse } from './pagination-response';
import { Movie } from './movie';

describe('TMDBService', () => {
  let service: TMDBService;
  let spy: any;

  beforeEach(() => {
    spy = jasmine.createSpyObj('ValueService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: spy,
        },
      ],
    });
    service = TestBed.inject(TMDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('nowMovies() should return the transformed response', () => {
    const observable = of<PaginationResponse<Movie>>({
      page: 1,
      results: [],
      total_results: 0,
      total_pages: 0,
    });
    spy.get.and.returnValue(observable);

    service.nowMovies().subscribe((movies) => {
      expect(spy.get).toHaveBeenCalledTimes(1);
      expect(movies).toEqual([]);
    });
  });
});
