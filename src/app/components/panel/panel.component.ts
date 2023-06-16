import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';
import { UserDetails, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass'],
})
export class PanelComponent implements OnInit {
  details: UserDetails | null = null;
  reservaciones: Reservacion[] = [];

  constructor(
    private userService: UsersService,
    private reservacionesService: FireReservacionesService
  ) {}

  ngOnInit(): void {
    this.userService.details$.subscribe((details) => (this.details = details));
    this.reservacionesService.myReservaciones.subscribe((reservaciones) => {
      if (reservaciones == null) {
        this.reservaciones = [];
        return;
      }
      this.reservaciones = reservaciones;
    });
  }
}
