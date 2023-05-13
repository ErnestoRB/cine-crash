import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginOutService {
  private userdata: User[] = [];
  private localStorageKey: string = 'users';
  private sessionStorageKey: string = 'activeUser';
  private obj!: User;

  constructor(private usersService: LocalStorageService) {
    let userdata: User[] | undefined = this.usersService.get(
      this.localStorageKey
    );
    if (!userdata) {
      return;
    }
    this.userdata = userdata;
    this.isLogged.next(this.isSessionAvailabe());
  }

  addUser(user: User): void {
    this.userdata.push(user);
    this.usersService.save(this.localStorageKey, this.userdata);
  }

  checkUser(user: string, pass: string): boolean {
    const currentUser = this.userdata.find(
      (object) => object.username === user && object.password === pass
    );
    if (currentUser) {
      sessionStorage.setItem(
        this.sessionStorageKey,
        JSON.stringify(currentUser)
      );
      this.transformObject();
      this.isLogged.next(true);
      return true;
    } else {
      return false;
    }
  }

  isLogged = new BehaviorSubject<boolean>(false);

  isSessionAvailabe(): boolean {
    if (sessionStorage.getItem(this.sessionStorageKey)) {
      this.transformObject();
      return true;
    } else {
      return false;
    }
  }

  removeSession(): void {
    sessionStorage.removeItem(this.sessionStorageKey);
    this.isLogged.next(false);
  }

  transformObject(): void {
    const data = sessionStorage.getItem(this.sessionStorageKey);
    if (data !== null) {
      this.obj = JSON.parse(data);
    }
  }

  getName(): string {
    return this.obj.name;
  }

  getUsername(): string {
    return this.obj.username;
  }

  getLastname(): string {
    return this.obj.lastname;
  }

  getEmail(): string {
    return this.obj.email;
  }
}
