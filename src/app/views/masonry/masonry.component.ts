import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

declare var Masonry: any;

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.sass'],
})
export class MasonryComponent implements OnInit, AfterViewInit {
  @ViewChild('masonry') masonryRef?: ElementRef<HTMLDivElement>;

  constructor() {}
  ngAfterViewInit(): void {
    setTimeout(() => this.updateMasonry(), 3000);
  }

  ngOnInit(): void {}

  updateMasonry() {
    new Masonry(this.masonryRef?.nativeElement, {
      // options
      itemSelector: '.col',
      percentPosition: true,
    });
  }
}
