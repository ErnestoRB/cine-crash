import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface ExpiryDateStatus {
  status: 'required' | 'invalid' | 'valid';
  date?: Date;
}

@Component({
  selector: 'app-expiry-date',
  templateUrl: './expiry-date.component.html',
  styleUrls: ['./expiry-date.component.sass'],
})
export class ExpiryDateComponent implements OnInit {
  constructor() {}

  @Output() date = new EventEmitter<ExpiryDateStatus>();

  value: string = '';
  ngOnInit(): void {}

  valid: boolean = false;

  onInputChange(evt: Event) {
    evt.preventDefault();

    const target = evt.currentTarget;
    if (!target) {
      return;
    }
    const value = (evt.target as HTMLInputElement).value;
    if (value.length < 2) return;

    this.value = this.formatString(value);

    if (value.length < 5) {
      this.valid = false;
      this.date.emit({ status: 'required' });

      return;
    }

    const month = Number(this.getMonth(value));
    const year = Number(this.getYear(value));

    if (Number.isNaN(month) || Number.isNaN(year)) {
      this.date.emit({ status: 'invalid' });
      this.valid = false;
      return;
    }

    if (month < 1 || month > 12) {
      this.date.emit({ status: 'invalid' });
      this.valid = false;

      return;
    }
    this.valid = true;
    const date = new Date();
    date.setFullYear(year + 2000, month - 1, 1);
    this.date.emit({ status: 'valid', date });
  }

  formatString(string: string) {
    return (
      this.getMonth(string) +
      (string.length > 2 ? '/' : '') +
      string.replace(/\//g, '').substring(2, 4)
    );
  }

  getMonth(string: string): string {
    return string.replace(/\//g, '').substring(0, 2);
  }

  getYear(string: string): string {
    return string.replace(/\//g, '').substring(2, 4);
  }
}
