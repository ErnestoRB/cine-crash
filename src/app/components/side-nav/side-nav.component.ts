import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginOutService } from 'src/app/services/login-out.service';
type SideNavMenuItem = MenuItem & { materialIcon?: string; needAuth?: boolean };

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
    /*     {
      label: 'Peliculas',
      routerLink: '/home',
      icon: 'pi pi-play',
    }, */

    {
      label: 'Dulceria',
      routerLink: '/candy-store',
      icon: 'pi pi-shopping-cart',
    },
    {
      label: 'Historial',
      routerLink: '/history',
      icon: 'pi pi-history',
      needAuth: true,
    },
    {
      label: 'Nosotros',
      routerLink: '/about',
      icon: 'pi pi-users',
    },
    {
      label: 'Gráficas',
      routerLink: '/charts',
      icon: 'pi pi-chart-bar',
    },
  ];
  constructor(private _loginService: LoginOutService) {}

  ngOnInit() {
    this._loginService.isLogged.subscribe(
      (isLogged) => (this.logged = isLogged)
    );
  }
  logged: boolean = false;
}
