import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@models';
import { TMDBService } from '@services';

@Component({
  selector: 'app-show-movies',
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.sass'],
})
export class ShowMoviesComponent implements OnInit {
  movies: Movie[] = [];
  movieToSearch!: string;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieToSearch = params['movieSearch'];
      this.updateMovie();
    });
  }

  updateMovie(): void {
    this.tmdbService.searchMovies(this.movieToSearch).subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }
}
