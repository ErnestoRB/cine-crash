import { Component } from '@angular/core';
import { TMDBService } from './tmdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cine-crash';

  constructor(private movies: TMDBService){
    this.movies.nowMovies(1).subscribe(data => console.log(data));
  }
}
