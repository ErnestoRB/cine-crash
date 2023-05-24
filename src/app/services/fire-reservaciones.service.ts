import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  list,
  ref,
  push,
  update,
  child,
  remove,
  objectVal,
  listVal,
} from '@angular/fire/database';

import { Reservacion, ReservacionBase } from '@models';
import { Observable, from, map, tap } from 'rxjs';

export interface FireReservacionInput extends ReservacionBase {
  fechaGenerado: string;
  fechaReservacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class FireReservacionesService {
  private dbPath = '/reservaciones';

  reservacionesRef: DatabaseReference;

  constructor(db: Database) {
    this.reservacionesRef = ref(db, this.dbPath);
  }

  getAll(): Observable<Reservacion[]> {
    return listVal<FireReservacionInput[]>(this.reservacionesRef).pipe(
      tap(console.log),
      map((reservaciones) => reservaciones.map(this.convertDates))
    );
  }

  get(key: string) {}

  convertDates(rsv: FireReservacionInput): Reservacion {
    const normalized: Reservacion = {
      ...rsv,
      fechaGenerado: new Date(rsv.fechaGenerado),
      fechaReservacion: new Date(rsv.fechaReservacion),
    };
    return normalized;
  }

  create(reservacion: FireReservacionInput): any {
    return push(this.reservacionesRef, reservacion);
  }

  update(key: string, value: any): Observable<void> {
    return from(update(child(this.reservacionesRef, key), value));
  }

  delete(key: string): Observable<void> {
    return from(remove(child(this.reservacionesRef, key)));
  }
}
