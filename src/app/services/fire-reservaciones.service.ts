import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  ref,
  push,
  update,
  child,
  remove,
  listVal,
} from '@angular/fire/database';

import { Reservacion, ReservacionBase } from '@models';
import { Observable, from, map, mergeMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface FireReservacionInput extends ReservacionBase {
  id?: string;
  fechaGenerado: string;
  fechaReservacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class FireReservacionesService {
  private dbPath = '/reservaciones';

  reservacionesRef: DatabaseReference;

  constructor(db: Database, private authService: AuthService) {
    this.reservacionesRef = ref(db, this.dbPath);
  }

  getAll(): Observable<Reservacion[]> {
    return listVal<Record<string, FireReservacionInput>>(
      this.reservacionesRef
    ).pipe(
      map((reservacionesRecord) =>
        reservacionesRecord
          ? reservacionesRecord.flatMap((record) =>
              Object.keys(record).map((rsvId) => ({
                id: rsvId,
                ...record[rsvId],
              }))
            )
          : []
      ),
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

  myReservaciones = this.authService.user$.pipe(
    mergeMap((user) => (user ? this.getMyReservaciones(user.uid) : []))
  );

  getMyReservaciones(id: string) {
    return listVal<Reservacion>(child(this.reservacionesRef, id), {
      keyField: 'id',
    });
  }

  convertDates(rsv: FireReservacionInput): Reservacion {
    const normalized: Reservacion = {
      ...rsv,
      fechaGenerado: new Date(rsv.fechaGenerado),
      fechaReservacion: new Date(rsv.fechaReservacion),
    };
    return normalized;
  }

  create(uid: string, reservacion: FireReservacionInput) {
    return push(child(this.reservacionesRef, uid), reservacion);
  }

  update(uid: string, key: string, value: any): Observable<void> {
    return from(update(child(this.reservacionesRef, uid + '/' + key), value));
  }

  delete(uid: string, key: string): Observable<void> {
    console.log({ uid, key });

    return from(remove(child(this.reservacionesRef, uid + '/' + key)));
  }
}
