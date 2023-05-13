import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@models';
import { TMDBService } from '@services';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {}

  movie: Movie | undefined;
  error: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        return;
      }
      this.tmdbService.getMovie(Number(id)).subscribe({
        next: (movie) => (this.movie = movie),
        error: () => {
          this.error = true;
        },
      });
    });
  }
}
