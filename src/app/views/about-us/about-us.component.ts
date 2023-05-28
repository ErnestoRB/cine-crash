import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.sass'],
})
export class AboutUsComponent implements OnInit {
  showDropdown: boolean = false;
  fontSize: boolean = false;
  changeFont: boolean = false;
  align: string = '';
  isSpeaking: boolean = speechSynthesis?.speaking;

  constructor() {}

  ngOnInit(): void {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onButtonClicked(button: any) {
    if (button.label === 'Tamaño de Texto') {
      this.fontSize = !this.fontSize;
    } else if (button.label === 'Tipografía') {
      this.changeFont = !this.changeFont;
    } else if (button.label === 'Alinear Texto') {
      this.changeAlign();
    } else if (button.label === 'Iniciar Lectura') {
      this.startReading();
    } else if (button.label === 'Pausar/Reanudar Lectura') {
      this.stopStart();
    } else if (button.label === 'Terminar Lectura') {
      this.endReading();
    }
  }

  endReading(): void {
    this.isSpeaking = false;
    speechSynthesis.cancel();
  }

  changeAlign(): void {
    if (this.align === '') {
      this.align = 'left';
    } else if (this.align === 'left') {
      this.align = 'right';
    } else if (this.align === 'right') {
      this.align = '';
    } else {
      this.align = '';
    }
  }

  startReading(): void {
    const textToRead = document.getElementById('toRead')?.textContent;
    if (textToRead && !speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.7;
      utterance.lang = 'es-MX';
      speechSynthesis.speak(utterance);
      this.isSpeaking = true;
    }
  }

  stopStart(): void {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }

  ngOnDestroy() {
    speechSynthesis.cancel();
  }
}
