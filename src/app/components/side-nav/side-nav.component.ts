import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {

  pages = [
    {
      label: 'Inicio',
      path: '/home',
      icon: 'home'
    },
    {
      label: 'Peliculas',
      path: '/movie',
      icon: 'movie'
    },
    {
      label: 'Comprar',
      path: '/buy',
      icon: 'shopping_cart'
    },
    {
      label: 'Historial',
      path: '/history',
      icon: 'history'
    },
    {
      label: 'Nosotros',
      path: '/about',
      icon: 'groups'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
