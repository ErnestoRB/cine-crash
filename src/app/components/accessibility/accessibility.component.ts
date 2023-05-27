import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.sass']
})
export class AccessibilityComponent implements OnInit {

  title: string = "Accesibilidad";
  buttons = [
    { label: 'Tamaño de Texto' },
    { label: 'Tipografía' },
    { label: 'Alinear Texto' }
  ];

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(button: any) {
    this.buttonClicked.emit(button);
  }

}
