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

  constructor(private _loginService: LoginOutService) {}
  ngAfterViewInit(): void {
    //setTimeout(() => this.updateMasonry(), 3000);
  }

  loaded: boolean = false;

  ngOnChanges() {
    if (this.movies && this.movies.length > 0) {
      const promise = this.loadImages();
      console.log(promise);

      promise
        .then(() => console.log('loaded'))
        .then(() => (this.loaded = true))
        .then(() => setTimeout(() => this.updateMasonry(), 5000));
    }
  }

  ngOnInit(): void {
    this.logged = this._loginService.isLogged();
  }

  loadImages() {
    const promises = this.movies.map((movie) => {
      return new Promise<void>((res, rej) => {
        const image = new Image();
        image.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        image.onload = () => {
          console.log('Loadeds');

          res();
        };
      });
    });

    console.log(promises);

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
