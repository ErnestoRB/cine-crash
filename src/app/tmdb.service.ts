import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  getMovie(id: string): Observable<Movie> | void {
    const url = 'https://dev.ernestorb.com/tmdb/find/' + id;
    let params = {"external_source": "imdb_id", "page": "1"};
    let query = new HttpParams({ fromObject: params });
    return this.http.get<Movie>(url);
  }

  searchMovie(search: string): Observable<Movie> | void {
    const url = 'https://dev.ernestorb.com/tmdb/search/movie';
    let params = {"query": search, "page": "1"};
    let query = new HttpParams({ fromObject: params });
    return this.http.get<Movie>(url, {params: query});
  }

  nowMovies(): Observable<Movie[]> | void {
    const url = 'https://dev.ernestorb.com/tmdb/movie/now_playing';
    let params = {"page": "1"};
    let query = new HttpParams({ fromObject: params });
    return this.http.get<Movie[]>(url, {params: query});
  }
}
