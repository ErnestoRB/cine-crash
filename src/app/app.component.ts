import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'cine-crash';

  constructor(private messageService: MessageService) {}

  ngAfterViewInit() {
    this.messageService.add({
      summary: 'Aviso',
      sticky: true,
      detail: 'Este es un proyecto escolar',
    });
  }
}
