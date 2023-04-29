import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Reservacion } from './reservacion';

@Injectable({
  providedIn: 'root',
})
export class ReservacionesService {
  constructor(public lsService: LocalStorageService) {
    this.loadReservaciones();
  }

  key = 'reservaciones';

  reservaciones: Reservacion[] = [];

  loadReservaciones() {
    let reservaciones: Reservacion[] | undefined = this.lsService.get(this.key);
    if (!reservaciones) {
      return;
    }
    this.reservaciones = reservaciones;
  }

  reservar(reservacion: Reservacion) {
    if (!this.isFechaValida(reservacion.fechaReservacion)) {
      throw new Error('La fecha de reservación ya pasó!');
    }
    this.reservaciones.push(reservacion);

    this.lsService.save(this.key, this.reservaciones);
  }

  isFechaValida(date: Date): boolean {
    const now = new Date();
    return (
      date.getDate() >= now.getDate() &&
      date.getMonth() >= now.getMonth() &&
      date.getFullYear() >= now.getFullYear()
    );
  }
}
