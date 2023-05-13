import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  basePath = 'assets/dulces/';
  promotions = [
    [
      {
        desc: 'Compra 1 y el segundo al 50%',
        img: 'magnum.webp',
      },
      {
        desc: '30% de descuento en cualquier sabor',
        img: 'pringles.jfif',
      },
      {
        desc: '2 x 1 en Doritos',
        img: 'doritos.jfif',
      },
      {
        desc: 'Takis Gratis en la compra de un ICE',
        img: 'takis.jfif',
      },
    ],
    [
      {
        desc: '30% de descuento dia Lunes',
        img: 'panditas.jfif',
      },
      {
        desc: '30% de descuento dia Lunes',
        img: 'freskas.jfif',
      },
      {
        desc: '30% de descuento dia Lunes',
        img: 'skittles.jfif',
      },
      {
        desc: '30% de descuento dia Lunes',
        img: 'chokis.jfif',
      },
    ],
  ];

  ngOnInit(): void {}
}
