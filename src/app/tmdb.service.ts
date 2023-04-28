import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable, map, pipe } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationResponse } from './pagination-response';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  getMovie(id: string): Observable<Movie> {
    const url = 'https://dev.ernestorb.com/tmdb/find/' + id;
    let params = { external_source: 'imdb_id', page: '1' };
    let query = new HttpParams({ fromObject: params });
    return this.http.get<Movie>(url, { params: query });
  }

  searchMovies(
    search: string,
    page: number = 1
  ): Observable<PaginationResponse<Movie>> {
    const url = 'https://dev.ernestorb.com/tmdb/search/movie';
    let params = { query: search, page: page };
    let query = new HttpParams({ fromObject: params });
    return this.http.get<PaginationResponse<Movie>>(url, { params: query });
  }

  nowMovies(page: number = 1): Observable<Movie[]> {
    const url = 'https://dev.ernestorb.com/tmdb/movie/now_playing';
    let params = { page: page };
    let query = new HttpParams({ fromObject: params });
    const transformResponse = pipe(
      map((movie: PaginationResponse<Movie>) => movie.results)
    );
    return transformResponse(
      this.http.get<PaginationResponse<Movie>>(url, { params: query })
    );
  }
}
