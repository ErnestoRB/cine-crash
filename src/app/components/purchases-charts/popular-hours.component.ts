import { Component, OnInit } from '@angular/core';
import { Reservacion } from '@models';
import { FireReservacionesService } from 'src/app/services/fire-reservaciones.service';

@Component({
  selector: 'app-popular-hours',
  templateUrl: './popular-hours.component.html',
  styleUrls: ['./popular-hours.component.sass'],
})
export class PopularHoursComponent implements OnInit {
  byHourData: any;
  byHourOptions: any;

  byMesData: any;
  byMesOptions: any;

  constructor(private reservacionesService: FireReservacionesService) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.reservacionesService.getAllCountByHour().subscribe((pop) => {
      console.log(pop);
      this.byHourData = {
        labels: Object.keys(pop),
        datasets: [
          {
            data: Object.values(pop),
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400'),
            ],
          },
        ],
      };

      this.byHourOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    });

    this.reservacionesService.getAllCountByMonth().subscribe((pop) => {
      console.log(pop);
      this.byMesData = {
        labels: Object.keys(pop),
        datasets: [
          {
            data: Object.values(pop),
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400'),
            ],
          },
        ],
      };

      this.byMesOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    });
  }
}
