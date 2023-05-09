import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.sass'],
})
export class BuyComponent implements OnInit {
  fecha?: Date;

  constructor() {}

  onFechaReceived(fecha: Date) {
    this.fecha = fecha;
  }

  ngOnInit(): void {}
}
