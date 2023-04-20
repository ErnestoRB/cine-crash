import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(name: string, object: { [key: string | number]: any } | any[]): void {
    if (typeof object !== 'object') {
      throw new Error('No se permiten persistir valores que no sean objetos!');
    }
    window.localStorage.setItem(name, JSON.stringify(object));
  }

  get<T>(name: string): T | undefined {
    const value = window.localStorage.getItem(name);
    if (!value) {
      return undefined;
    }
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return undefined;
    }
  }
}
