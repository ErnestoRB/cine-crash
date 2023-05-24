import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
})
export class HistoryComponent implements OnInit {
  constructor(private reservacionesService: FireReservacionesService) {}

  reservaciones: Reservacion[] = [];

  ngOnInit(): void {
    this.reservacionesService.getAll().subscribe((rsvs) => {
      this.reservaciones = rsvs;
    });
  }
}
