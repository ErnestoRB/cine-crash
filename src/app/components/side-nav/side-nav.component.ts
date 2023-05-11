import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
type SideNavMenuItem = MenuItem & { materialIcon?: string };

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass'],
})
export class SideNavComponent implements OnInit {
  pages: SideNavMenuItem[] = [
    {
      label: 'Inicio',
      routerLink: '/home',
      icon: 'pi pi-home',
    },
    {
      label: 'Peliculas',
      routerLink: '/movie',
      icon: 'pi pi-play',
    },

    {
      label: 'Dulceria',
      routerLink: '/candy-store',
      icon: 'pi pi-shopping-cart',
    },
    {
      label: 'Historial',
      routerLink: '/history',
      icon: 'pi pi-history',
    },
    {
      label: 'Nosotros',
      routerLink: '/about',
      icon: 'pi pi-users',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
