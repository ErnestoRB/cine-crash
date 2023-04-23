import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  getMovie(id: number): Observable<Movie> | void {
    const url = 'https://dev.ernestorb.com/movies/API/Movies/' + id;
    return this.http.get<Movie>(url);
  }

  searchMovie(search: string): Observable<Movie> | void {
    const url = 'https://dev.ernestorb.com/movies/API/Movies';
    let params = {"search": search, "page": "2"};
    let query = new HttpParams({ fromObject: params });
    return this.http.get<Movie>(url, {params: query});
  }

  nowMovies(): Observable<Movie[]> | void {
    const url = 'https://dev.ernestorb.com/movies/API/Movies';
    return this.http.get<Movie[]>(url);
  }
}
