import { Injectable } from '@angular/core';
import { Movie, PaginationResponse } from '@models';
import { Observable, map, pipe } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://dev.ernestorb.com/tmdb/';

  commonParams = {
    language: 'es',
  };

  getMovie(id: number): Observable<Movie> {
    const url = this.baseUrl + 'movie/' + id;
    return this.http.get<Movie>(url, {
      params: new HttpParams({ fromObject: this.commonParams }),
    });
  }

  searchMovies(search: string, page: number = 1): Observable<Movie[]> {
    const url = this.baseUrl + 'search/movie';
    let params = { query: search, page: page, ...this.commonParams };
    let query = new HttpParams({ fromObject: params });
    const transformResponse = pipe(
      map((movie: PaginationResponse<Movie>) => movie.results)
    );
    return transformResponse(
      this.http.get<PaginationResponse<Movie>>(url, { params: query })
    );
  }

  nowMovies(page: number = 1): Observable<Movie[]> {
    const url = this.baseUrl + 'movie/now_playing';
    let params = { page: page, ...this.commonParams };
    let query = new HttpParams({ fromObject: params });
    const transformResponse = pipe(
      map((movie: PaginationResponse<Movie>) => movie.results)
    );
    return transformResponse(
      this.http.get<PaginationResponse<Movie>>(url, { params: query })
    );
  }
}
