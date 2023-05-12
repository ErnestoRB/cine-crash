import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { ReservacionesService } from '@services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
})
export class HistoryComponent implements OnInit {
  constructor(private reservacionesService: ReservacionesService) {}

  reservaciones: Reservacion[] = [];

  ngOnInit(): void {
    this.reservacionesService.loadReservaciones();
    this.reservaciones = this.reservacionesService.reservaciones;
  }
}
