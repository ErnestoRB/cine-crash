import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Movie } from '../../models';
import { LoginOutService } from 'src/app/services/login-out.service';
import { AuthService } from 'src/app/services/auth.service';

declare var Masonry: any;

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.sass'],
})
export class MasonryComponent implements OnInit, AfterViewInit {
  @ViewChild('masonry') masonryRef?: ElementRef<HTMLDivElement>;
  @Input() movies!: Movie[];

  logged: boolean = false;

  constructor(private _auth: AuthService) {}
  ngAfterViewInit(): void {
    //setTimeout(() => this.updateMasonry(), 3000);
  }

  loaded: boolean = false;

  ngOnChanges() {
    if (this.movies && this.movies.length > 0) {
      const promise = this.loadImages();
      promise
        .then(() => (this.loaded = true))
        .then(() => setTimeout(() => this.updateMasonry(), 5000));
    }
  }

  ngOnInit(): void {
    this._auth.user$.subscribe((user) => (this.logged = !!user));
  }

  loadImages() {
    const promises = this.movies.map((movie) => {
      return new Promise<void>((res, rej) => {
        const image = new Image();
        image.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        image.onload = () => {
          res();
        };
      });
    });

    return Promise.all(promises);
  }

  updateMasonry() {
    new Masonry(this.masonryRef?.nativeElement, {
      // options
      itemSelector: '.col',
      percentPosition: true,
    });
  }
}
