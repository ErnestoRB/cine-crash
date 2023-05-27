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
    return listVal<{ [key: string]: FireReservacionInput[] }>(
      this.reservacionesRef
    ).pipe(
      tap(console.log),
      map((array) =>
        array.flatMap((object: any) =>
          Object.entries(object).flatMap(
            (pair) => pair[1] as FireReservacionInput[]
          )
        )
      ),
      tap(console.log),

      map((reservaciones) => reservaciones.map(this.convertDates))
    );
  }

  getAllFromUser(uid: string): Observable<Reservacion[]> {
    return listVal<FireReservacionInput[]>(
      child(this.reservacionesRef, uid)
    ).pipe(
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

  create(uid: string, reservacion: FireReservacionInput): any {
    return push(child(this.reservacionesRef, uid), reservacion);
  }

  update(uid: string, key: string, value: any): Observable<void> {
    return from(update(child(this.reservacionesRef, uid + '/' + key), value));
  }

  delete(uid: string, key: string): Observable<void> {
    return from(remove(child(this.reservacionesRef, uid + '/' + key)));
  }
}
