import { Component, OnInit } from '@angular/core';
import { Movie } from '@models';
import { TMDBService } from '@services';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  movieToSearch !: string;

  constructor() { }

  ngOnInit(): void {

  }

}
