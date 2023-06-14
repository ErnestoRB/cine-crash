import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '@models';
import { TMDBService } from '@services';
import { MenuItem } from 'primeng/api';
import { SweetAlertOptions } from 'sweetalert2';
import { LoginOutService } from 'src/app/services/login-out.service';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.sass'],
})
export class BuyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private router: Router,
    private fireService: FireReservacionesService,
    private loginService: LoginOutService,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  user: User | null = null;

  confirmDialogOptions: SweetAlertOptions = {
    title: 'Estás seguro?',
    showDenyButton: true,
    confirmButtonText: 'Sí, estoy seguro',
    denyButtonText: 'No, cancelar compra',
  };

  onFechaReceived(fecha: Date) {
    this.fecha = fecha;
  }
  STATUS = {
    fecha: 1,
    boletos: 2,
    pago: 3,
    finalizado: 4,
  };
  status: keyof typeof this.STATUS = 'fecha';

  items: MenuItem[] = [
    {
      id: 'fecha',
      label: 'Seleccionando fecha',
      state: {},
    },
    {
      id: 'boletos',
      label: 'Seleccionando cantidad de boletos',
    },
    {
      id: 'pago',
      label: 'Método de pago',
    },
    {
      id: 'finalizado',
      label: 'Compra finalizada',
    },
  ];
  fecha?: Date;

  movie: Movie | undefined;
  boletos: number = 1;
  pagoValidado: boolean = false;
  error: boolean = false;

  loading: boolean = true;
  precioPorPersona = 150;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        return;
      }
      this.tmdbService.getMovie(Number(id)).subscribe({
        next: (movie) => {
          this.movie = movie;
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.loading = false;
        },
      });
    });
  }

  continuar() {
    if (this.status === 'fecha' && this.fecha) {
      this.status = 'boletos';
    } else if (this.status === 'boletos' && this.boletos !== -1) {
      this.status = 'pago';
    } else if (this.status === 'pago' && this.pagoValidado) {
      this.crearCompra();
      this.status = 'finalizado';
    } else if (this.status === 'finalizado') {
      this.router.navigateByUrl('/home');
    }
  }

  crearCompra() {
    if (!this.user) {
      return;
    }
    this.fireService.create(this.user.uid, {
      idPelicula: this.movie!.id,
      cliente: this.user.uid,
      fechaGenerado: new Date().toISOString(),
      fechaReservacion: this.fecha!.toISOString(),
      titulo: this.movie!.title,
      boletos: this.boletos ?? 1,
    });
  }
}
