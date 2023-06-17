import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsersService } from '../services/users.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.status$.pipe(
      map((status) => {
        if (!status || !status.isAdmin) {
          this.messageService.add({
            summary: 'No puedes acceder esta ruta porque no eres admin!',
            severity: 'error',
          });
          return this.router.createUrlTree(['/home']);
        }
        return true;
      })
    );
  }
}
