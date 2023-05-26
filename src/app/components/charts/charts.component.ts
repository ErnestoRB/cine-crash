import { Component, OnInit } from '@angular/core';
import { Movie } from '@models';
import { TMDBService } from '@services';
import { Chart } from 'chart.js/auto';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {

  public chart: any;
  nowMovies: Movie[] = [];
  movieNames: string[] = [];
  moviePopularity: number[] = [];

  constructor(private tmdbService: TMDBService) { }

  ngOnInit(): void {
    this.tmdbService.nowMovies().subscribe((movies) =>{
      this.nowMovies = movies;
      this.nowMovies.sort(() => Math.random() - 0.5);
      console.log(this.nowMovies);
      this.saveData();
      this.createChart();
    });
  }

  saveData(): void{
    for(const movie of this.nowMovies){
      const name : string = movie.title;
      const popularity: number = movie.popularity;
      this.moviePopularity.push(popularity);
      this.movieNames.push(name);
    }
  }

  createChart(){
    this.chart = new Chart("PopChart", {
      type: 'bar',
      data:{
        labels: this.movieNames,
        datasets: [
          {
            label: "Votos de la comunidad",
            data: this.moviePopularity,
            backgroundColor: 'red'
          }
        ]
      },
      options:{
        responsive: true,
        scales:{
          x: {
            title:{
              display: true,
              text: "Peliculas Actuales",
              color: 'red'
            }
          },
          y: {
            title:{
              display: true,
              text: "Popularidad",
              color: 'red',
            }
          },
        }
      },
    });
  }

}
