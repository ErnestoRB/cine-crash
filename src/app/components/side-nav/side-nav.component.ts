import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService, RolState } from 'src/app/services/users.service';
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
  ];

  rol?: RolState | null;
  isLogged: boolean = false;

  constructor(private _auth: AuthService, private _autho: UsersService) {
    this._autho.status$.subscribe((status) => {
      this.rol = status;
    });
    this._auth.user$.subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  ngOnInit() {}
  logged: boolean = false;
}
