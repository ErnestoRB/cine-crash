import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-movies',
  templateUrl: './next-movies.component.html',
  styleUrls: ['./next-movies.component.sass'],
})
export class NextMoviesComponent implements OnInit {
  constructor() {}
  videos: string[] = [
    'XAjf55_ALoM',
    'NAjbftNQrDQ',
    '37ep9xtE1rY',
    'UwSBQWI-bek',
    '258m8dMKe8E',
    'hA-Jhu938vY',
    'JhpKuMb7Qk4',
    'fVP28fx0vwo',
    '19ikl8vy4zs',
    'rExfMTi3PAM',
    'wUDGydHK7b4',
    'IUBGRr_-TSQ',
    'hrJu8Z5lfVY',
    'Way9Dexny3w',
    'qZ40Z62tcXM',
    'q6W3YL1Ppkk',
    'nA7-qKCg3B8',
    'wPwzBUui1GA',
  ];

  ngOnInit(): void {}
}
