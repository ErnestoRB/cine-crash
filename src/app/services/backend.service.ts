import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reservacion } from '../models/reservacion';
import { map, tap } from 'rxjs';
import { FireReservacionInput } from './fire-reservaciones.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  url = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getReservacionesHechas(date: Date) {
    return this._http
      .get<Reservacion[]>(
        `${this.url}/api/reservacion/taken/${date.toISOString()}`
      )
      .pipe(map((rsvs) => rsvs.map(this.convertDates)));
  }

  convertDates(rsv: Reservacion): Reservacion {
    const normalized: Reservacion = {
      ...rsv,
      fechaGenerado: new Date(rsv.fechaGenerado),
      fechaReservacion: new Date(rsv.fechaReservacion),
    };
    return normalized;
  }

  isPhoneTaken(phone: string) {
    return this._http
      .get<{ taken: boolean }>(`${this.url}/api/user/phone/${phone}`)
      .pipe(map((r) => r.taken));
  }

  sendContactEmail(body: { email: string; message: string }) {
    return this._http.post(`${this.url}/api/contact`, body);
  }

  sendNotification(id: string) {
    return this._http.get<{ msg: string }>(
      `${this.url}/api/reservacion/notification/${id}`
    );
  }

  getReservacionInfo(id: string) {
    return this._http.get<FireReservacionInput>(
      `${this.url}/api/reservacion/${id}`
    );
  }
}
