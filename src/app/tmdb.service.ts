import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor() {}

  getMovie(id: number): Observable<Movie> | void {}

  searchMovie(search: string): Observable<Movie> | void {}

  nowMovies(): Observable<Movie[]> | void {}
}
