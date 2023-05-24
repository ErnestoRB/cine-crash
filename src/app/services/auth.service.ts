import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  User,
  RecaptchaVerifier,
  user,
} from '@angular/fire/auth';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  user$ = user(this.auth).pipe(tap((user) => console.log(user)));

  isLoggedInLS() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }

  iniciarSesion(telefono: string, recaptcha: RecaptchaVerifier) {
    return signInWithPhoneNumber(this.auth, telefono, recaptcha);
  }

  iniciarSesionEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  registerEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return this.auth.signOut();
  }
}
