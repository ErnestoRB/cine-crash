import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FireReservacionInput } from 'src/app/services/fire-reservaciones.service';

@Component({
  selector: 'app-qr-info',
  templateUrl: './qr-info.component.html',
  styleUrls: ['./qr-info.component.sass'],
})
export class QrInfoComponent implements OnInit {
  @Input() id!: string;
  reservacion: FireReservacionInput | null = null;
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService
      .getReservacionInfo(this.id)
      .subscribe((rsv) => (this.reservacion = rsv));
  }
}
