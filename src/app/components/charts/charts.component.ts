import { Component, OnInit } from '@angular/core';
import { Movie, Reservacion } from '@models';
import { TMDBService } from '@services';
import { Chart } from 'chart.js/auto';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';

interface MovieData {
  movieName: string;
  boughtTickets: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass'],
})
export class ChartsComponent implements OnInit {
  public chart!: Chart;

  movieNames: string[] = [];
  boughtTickets: number[] = [];
  reservations: Reservacion[] = [];
  movieData: MovieData[] = [];

  constructor(private reservationsService: FireReservacionesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.chart) {
      this.clearData();
    }
    this.reservationsService.getAll().subscribe((res: Reservacion[]) =>{
      this.reservations = res;
      this.reservations.sort(() => Math.random() - 0.5);
      console.log(this.reservations);
      
      this.reduceArray(); 
      this.createChart();
    })
  }

  reduceArray(): void{
    this.reservations.forEach((item) => {
      const index = this.movieData.findIndex((data) => data.movieName === item.titulo);
      if (index === -1) {
        this.movieData.push({ movieName: item.titulo, boughtTickets: item.boletos });
      } else {
        this.movieData[index].boughtTickets += item.boletos;
      }
    });

    this.movieNames = this.movieData.map((data) => data.movieName);
    this.boughtTickets = this.movieData.map((data) => data.boughtTickets);
  }

  clearData(): void {
    this.chart.destroy();
    this.reservations = [];
    this.movieNames = [];
    this.boughtTickets = [];
    this.movieData = [];
  }

  createChart() {
    this.chart = new Chart('PopChart', {
      type: 'bar',
      data: {
        labels: this.movieNames,
        datasets: [
          {
            label: 'Boletos comprados en total',
            data: this.boughtTickets,
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Peliculas',
              color: 'red',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Cantidad de boletos',
              color: 'red',
            },
          },
        },
      },
    });
  }
}
