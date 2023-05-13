import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.sass'],
})
export class BoletosComponent implements OnInit {
  @Output() boletos = new EventEmitter<number>();

  _boletos = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
  ]);

  constructor() {}

  ngOnInit(): void {
    this._boletos.valueChanges.subscribe((value) => {
      console.log(value);

      console.log(this._boletos.errors);

      if (this._boletos.valid) {
        this.boletos.emit(value!);
        return;
      }

      this.boletos.emit(-1);
    });
  }
}
