import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  get,
  listVal,
  objectVal,
  ref,
  set,
} from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Observable, from, map, mergeMap, of, tap } from 'rxjs';

export interface RolState {
  rol: string | null;
  isAdmin: boolean;
}

export interface UserDetails {
  provider: string | null;
  email: string | null;
  number: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersRef: DatabaseReference;
  status$: Observable<RolState | null>;
  details$: Observable<UserDetails | null>;

  constructor(authService: AuthService, db: Database) {
    this.usersRef = ref(db, 'users');
    this.status$ = authService.user$.pipe(
      mergeMap((user) => {
        if (!user) {
          return of(null);
        }
        return from(this.getState(user.uid));
      }),
      tap((rol) => {
        console.log(rol);
      })
    );
    this.details$ = authService.user$.pipe(
      mergeMap((user) => {
        if (!user) {
          return of(null);
        }
        return this.getUserDetails(user.uid);
      }),
      tap((rol) => {
        console.log(rol);
      })
    );
  }

  registerUserDetails(uid: string, user: UserDetails) {
    return set(child(this.usersRef, uid), { ...user });
  }

  getUserDetails(uid: string) {
    return objectVal<UserDetails>(child(this.usersRef, uid));
  }

  getUsers() {
    return listVal<UserDetails>(this.usersRef);
  }

  private async getState(id: string): Promise<RolState> {
    return {
      isAdmin: await this.isAdmin(id),
      rol: await this.getRol(id),
    };
  }

  private async getRol(id: string): Promise<string | null> {
    const snapshot = await get(child(this.usersRef, 'roles/' + id));
    if (!snapshot.exists()) {
      return null;
    }
    const { rol } = snapshot.val();
    if (!rol) {
      return null;
    }
    return rol as string;
  }

  private async isAdmin(id: string): Promise<boolean> {
    const rol = await this.getRol(id);
    if (!rol) return false;
    return rol.toLowerCase() === 'admin';
  }
}
