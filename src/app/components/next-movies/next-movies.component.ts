import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-movies',
  templateUrl: './next-movies.component.html',
  styleUrls: ['./next-movies.component.sass'],
})
export class NextMoviesComponent implements OnInit {
  constructor() {}
  videos: string[] = ['MVvGSBKV504', 'oBmazlyP220', 'Way9Dexny3w'];

  ngOnInit(): void {}
}
