import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.sass']
})
export class AboutUsComponent implements OnInit {

  showDropdown: boolean = false;
  fontSize: boolean = false;
  changeFont: boolean = false;
  align: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onButtonClicked(button: any) {
    if(button.label === 'Tamaño de Texto'){
      this.fontSize = !this.fontSize;
    }
    else if(button.label === 'Tipografía'){ 
      this.changeFont = !this.changeFont;
    }
    else if(button.label === 'Alinear Texto'){
      this.changeAlign();
    }
  }

  changeAlign(): void{
    if(this.align === ''){
      this.align = 'left';
    }
    else if(this.align === 'left'){
      this.align = 'right';
    }
    else if(this.align === 'right'){
      this.align = '';
    }
    else{
      this.align = '';
    }
  }

}
