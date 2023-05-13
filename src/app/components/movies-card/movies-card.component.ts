import { Component, OnInit } from '@angular/core';
import { TMDBService } from '../../services';
import { Movie } from '../../models';

@Component({
  selector: 'app-movies-card',
  templateUrl: './movies-card.component.html',
  styleUrls: ['./movies-card.component.sass'],
})
export class MoviesCardComponent implements OnInit {
  constructor(private tmdbService: TMDBService) {}

  movies: Movie[] = [];

  ngOnInit(): void {
    this.tmdbService.nowMovies().subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }
}
