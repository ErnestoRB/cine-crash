import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  get,
  ref,
} from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Observable, from, map, mergeMap, of, tap } from 'rxjs';

export interface RolState {
  rol: string | null;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  usersRef: DatabaseReference;
  status$: Observable<RolState | null>;

  constructor(authService: AuthService, db: Database) {
    this.usersRef = ref(db, 'users');
    this.status$ = authService.user$.pipe(
      mergeMap((user) => {
        if (!user) {
          return of(null);
        }
        return from(this.getState(user!.uid));
      }),
      tap((rol) => {
        console.log(rol);
      })
    );
  }

  private async getState(id: string) {
    return {
      rol: await this.getRol(id),
      isAdmin: await this.isAdmin(id),
    };
  }

  private async getRol(id: string): Promise<string | null> {
    const snapshot = await get(child(this.usersRef, id));
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
