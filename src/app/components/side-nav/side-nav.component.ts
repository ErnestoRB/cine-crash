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
  pages: SideNavMenuItem[] = [];
  rol?: RolState | null;
  isLogged: boolean = false;

  constructor(private _auth: AuthService, private _autho: UsersService) {
    this._autho.status$.subscribe((status) => {
      this.rol = status;

      this.pages = [
        {
          label: 'Inicio',
          routerLink: '/home',
          icon: 'pi pi-home',
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
          visible: !!status && status.isAdmin,
        },
        {
          label: 'Nosotros',
          routerLink: '/about',
          icon: 'pi pi-users',
        },
        {
          label: 'Administración',
          routerLink: '/admin',
          icon: 'pi pi-info-circle',
          visible: !!status && status.isAdmin,
        },
        {
          label: 'Gráficas',
          routerLink: '/charts',
          icon: 'pi pi-chart-bar',
          visible: !!status && status.isAdmin,
        },
        {
          label: 'Panel',
          routerLink: '/panel',
          icon: 'pi pi-user',
          visible: !!status && status.logged,
        },
        {
          label: 'Contacto',
          routerLink: '/contact',
          icon: 'pi pi-at',
        },
      ];
    });
  }

  ngOnInit() {}
  logged: boolean = false;
}
