import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
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
    public backendService: BackendService,
    private reservacionesService: FireReservacionesService,
    private messageService: MessageService
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

  deleteRecord(idCliente: string, id: string) {
    this.reservacionesService.delete(idCliente, id).subscribe({
      next: () => {
        this.messageService.add({
          summary: 'Reservación eliminada!',
          severity: 'success',
        });
      },
      error: (err) => {
        this.messageService.add({
          summary: 'Error al eliminar la reservación!',
          severity: 'danger',
        });
      },
    });
  }
}
