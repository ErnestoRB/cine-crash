import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';

@Component({
  selector: 'app-purchases-client',
  templateUrl: './purchases-client.component.html',
  styleUrls: ['./purchases-client.component.sass'],
})
export class PurchasesClientComponent implements OnInit {
  reservaciones: Reservacion[] = [];
  constructor(private reservacionesService: FireReservacionesService) {}

  ngOnInit(): void {
    this.reservacionesService.getAll().subscribe((reservacion) => {
      console.log({ reservacion });

      this.reservaciones = reservacion;
    });
  }
}
