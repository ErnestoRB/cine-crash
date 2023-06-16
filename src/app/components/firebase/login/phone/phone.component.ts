import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { UsersService } from 'src/app/services/users.service';
import { AvailablePhoneValidator } from 'src/app/validators/available-phone.validator';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.sass'],
})
export class PhoneComponent implements OnInit {
  @ViewChild('captchaContainer') captchaContainer?: ElementRef<HTMLDivElement>;
  captchaVerifier?: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;

  phoneForm = this.fb.group({
    number: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      [AvailablePhoneValidator.createValidator(this.backendService)],
    ],
  });

  otpForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  ngAfterViewInit() {
    this.captchaVerifier = new RecaptchaVerifier(
      this.captchaContainer!.nativeElement,
      {},
      this.auth.auth
    );
    this.captchaVerifier?.render();
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private users: UsersService,
    private backendService: BackendService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async submit() {
    const { number } = this.phoneForm.value;
    this.confirmationResult = await this.auth.iniciarSesion(
      `+52${number}`!,
      this.captchaVerifier!
    );
  }

  submitOTP() {
    const { code } = this.otpForm.value;
    this.confirmationResult?.confirm(code!);
    this.messageService.add({
      summary: 'Éxito!',
      severity: 'success',
      detail: 'Sesión iniciada correctamente',
    });
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
