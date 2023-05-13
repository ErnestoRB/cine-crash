import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candy-store',
  templateUrl: './candy-store.component.html',
  styleUrls: ['./candy-store.component.sass'],
})
export class CandyStoreComponent implements OnInit {
  basePath = 'assets/dulces/';
  products = [
    [
      {
        desc: 'Pulparindo',
        img: 'pulparindo.jfif',
      },
      {
        desc: 'Churrumais',
        img: 'churrumais.jpg',
      },
      {
        desc: 'Doritos',
        img: 'doritos.jfif',
      },
      {
        desc: 'Takis',
        img: 'takis.jfif',
      },
    ],
    [
      {
        desc: 'Pringles',
        img: 'pringles.jfif',
      },
      {
        desc: 'Freskas',
        img: 'freskas.jfif',
      },
      {
        desc: 'Skittles',
        img: 'skittles.jfif',
      },
      {
        desc: 'Chokis',
        img: 'chokis.jfif',
      },
    ],
    [
      {
        desc: 'Oreo',
        img: 'oreo.png',
      },
      {
        desc: 'Panditas',
        img: 'panditas.jfif',
      },
      {
        desc: 'Sour Patch',
        img: 'sour.jfif',
      },
      {
        desc: 'Ring Pop',
        img: 'ringpop.jfif',
      },
    ],
    [
      {
        desc: 'Kit Kat',
        img: 'kit kat.jfif',
      },
      {
        desc: 'Herseys',
        img: 'herssheys.jfif',
      },
      {
        desc: 'Ruffles',
        img: 'rufles.jfif',
      },
      {
        desc: 'Magnum',
        img: 'magnum.webp',
      },
    ],
  ];
  constructor() {}

  ngOnInit(): void {}
}
