import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReservacionesService } from '@services';

interface Funcion {
  fecha: Date;
  reservada?: boolean;
}

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.sass'],
})
export class SelectDateComponent implements OnInit {
  fecha = new FormControl<Date>(new Date());
  hora = new FormControl<Date>(this.nextAvailableDate());
  hoy = new Date(); // usada en template

  @Input() showDate: boolean = true;

  @Output() fechaSeleccionada = new EventEmitter<Date>();

  funciones: Funcion[] = [];
  selected: Date | null = null;

  constructor(private reservacionesService: ReservacionesService) {}

  calMaxHours(): void {
    console.log(this.reservacionesService.reservaciones);

    this.fecha.valueChanges.subscribe((fecha) => {
      if (fecha) {
        this.funciones.splice(0);

        const minimal = this.nextAvailableDate(fecha);
        let lastFecha = minimal;
        const maximal = this.getMaxHour(minimal);
        // funciones entre hora minima y hora máxima
        while (
          lastFecha.getTime() >= minimal.getTime() &&
          lastFecha.getTime() <= maximal.getTime()
        ) {
          this.funciones.push({ fecha: lastFecha });
          const fechaFuncion = new Date(lastFecha.getTime() + 30 * 60 * 1000);
          lastFecha = fechaFuncion;
        }
      }
      this.funciones.forEach((funcion) => {
        funcion.reservada = this.reservacionesService.reservaciones.some(
          (rsv) => rsv.fechaReservacion.getTime() == funcion.fecha.getTime()
        );
      });
    });
    this.hora.valueChanges.subscribe(console.log);
  }

  isToday(fecha: Date): boolean {
    const now = new Date();
    return (
      fecha.getDate() === now.getDate() &&
      fecha.getMonth() === now.getMonth() &&
      fecha.getFullYear() === now.getFullYear()
    );
  }

  nextAvailableDate(fecha?: Date): Date {
    if (fecha && !this.isToday(fecha)) {
      const newFecha = new Date(fecha);
      newFecha.setHours(12, 0, 0, 0);
      return newFecha;
    }
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12 || hours > 23) {
      now.setHours(12, 0, 0, 0);
    } else {
      const minutes = now.getMinutes();
      if (minutes < 30) {
        now.setMinutes(30, 0, 0);
      } else {
        now.setHours(hours + 1, 0, 0, 0);
        now.setMinutes(0, 0, 0);
      }
    }
    return now;
  }

  private getMaxHour(date?: Date) {
    if (!date) {
      const now = new Date();
      now.setHours(23, 0, 0, 0);
      return now;
    }
    const max = new Date(date);
    max.setHours(23, 0, 0, 0);
    return max;
  }

  ngOnInit(): void {
    this.calMaxHours();
  }
}
