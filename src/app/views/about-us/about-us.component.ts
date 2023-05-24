import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.sass'],
})
export class AboutUsComponent implements OnInit {
  constructor(public back: BackendService) {}
  autores: Autor[] = [];

  ngOnInit(): void {
    this.back.getAutores().subscribe((autores) => {
      this.autores = autores;
    });
  }
}
