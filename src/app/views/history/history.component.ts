import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { User } from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
})
export class HistoryComponent implements OnInit {
  user: User | null = null;
  constructor(
    private auth: AuthService,
    private reservacionesService: FireReservacionesService,
    private messageService: MessageService
  ) {}

  reservaciones: Reservacion[] = [];

  ngOnInit(): void {
    this.reservacionesService.getAll().subscribe((rsvs) => {
      this.reservaciones = rsvs;
    });
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  deleteRecord(idCliente: string, id: string) {
    if (!this.user) return;
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
