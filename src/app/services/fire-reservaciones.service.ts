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

  getAllByHour() {
    return this.getAll().pipe(
      map((rsvs) =>
        rsvs.reduce((acc: Record<string, Reservacion[]>, rsv: Reservacion) => {
          const { fechaReservacion: fecha } = rsv;

          console.log({ acc, rsv });

          // Obtener las horas y minutos
          const horas = fecha.getHours();
          const minutos = fecha.getMinutes();

          // Formatear las horas y minutos con ceros a la izquierda si es necesario
          const horasFormateadas = horas < 10 ? `0${horas}` : horas;
          const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

          // Crear el string con el formato hh:mm
          const formatoHora = `${horasFormateadas}:${minutosFormateados}`;
          if (!acc[formatoHora]) {
            acc[formatoHora] = [];
          }
          acc[formatoHora].push(rsv);
          return acc;
        }, {})
      )
    );
  }

  getAllByMonth() {
    return this.getAll().pipe(
      map((rsvs) =>
        rsvs.reduce((acc: Record<string, Reservacion[]>, rsv: Reservacion) => {
          const { fechaReservacion: fecha } = rsv;

          console.log({ acc, rsv });

          // Obtener las horas y minutos
          const month = fecha.getMonth();
          const year = fecha.getFullYear();

          // Formatear las horas y minutos con ceros a la izquierda si es necesario
          const mesFormateado = month < 10 ? `0${month}` : month;

          // Crear el string con el formato hh:mm
          const formatoHora = `${year}-${mesFormateado}`;
          if (!acc[formatoHora]) {
            acc[formatoHora] = [];
          }
          acc[formatoHora].push(rsv);
          return acc;
        }, {})
      )
    );
  }

  getAllCountByHour() {
    return this.getAllByHour().pipe(
      map((record) => {
        const obj: Record<string, number> = {};
        Object.keys(record).forEach((key) => {
          obj[key] = record[key].length;
          return obj;
        });
        return obj;
      })
    );
  }

  getAllCountByMonth() {
    return this.getAllByMonth().pipe(
      map((record) => {
        const obj: Record<string, number> = {};
        Object.keys(record).forEach((key) => {
          obj[key] = record[key].length;
          return obj;
        });
        return obj;
      })
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
