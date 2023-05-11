import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@models';
import { TMDBService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.sass'],
})
export class BuyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private location: Location
  ) {}
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
  boletos: number | undefined;
  pagoValidado: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        return;
      }
      this.tmdbService
        .getMovie(Number(id))
        .subscribe((movie) => (this.movie = movie));
    });
  }

  continuar() {
    if (this.status === 'fecha' && this.fecha) {
      this.status = 'boletos';
    } else if (this.status === 'boletos' && this.boletos) {
      this.status = 'pago';
    } else if (this.status === 'pago' && this.pagoValidado) {
      this.status = 'finalizado';
    } else if (this.status === 'finalizado') {
      window.location.assign('/home');
    }
  }
}
