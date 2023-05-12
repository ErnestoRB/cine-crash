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
    setTimeout(() => this.updateMasonry(), 3000);
  }

  ngOnInit(): void {
    this.logged = this._loginService.isLogged();
  }

  updateMasonry() {
    new Masonry(this.masonryRef?.nativeElement, {
      // options
      itemSelector: '.col',
      percentPosition: true,
    });
  }
}
