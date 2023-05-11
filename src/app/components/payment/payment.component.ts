import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExpiryDateStatus } from '../expiry-date/expiry-date.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
})
export class PaymentComponent implements OnInit {
  @Output() isValid = new EventEmitter<boolean>();

  debtForm = this.fb.group({
    name: ['', [Validators.required]],
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    cvv: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
  });

  expiryDate: Date | undefined;
  expiryDateStatus: ExpiryDateStatus['status'] = 'invalid';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.debtForm.valueChanges.subscribe((values) => {
      this.isValid.emit(this.isPagoValido());
    });
  }

  isPagoValido(): boolean {
    return this.debtForm.valid && this.expiryDateStatus === 'valid';
  }

  onDateChange(object: ExpiryDateStatus) {
    this.expiryDateStatus = object.status;
    this.isValid.emit(this.isPagoValido());

    if (object.status == 'invalid') {
      this.expiryDate = undefined;
      return;
    }
    this.expiryDate = object.date!;
  }
}
