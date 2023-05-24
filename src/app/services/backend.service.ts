import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../models/autor';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getAutores() {
    return this._http.get<Autor[]>(`${environment.apiUrl}/api/autores`);
  }
}
