import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  phoneForm = this.fb.group({
    number: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
  });

  otpForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });
  loginType: 'phone' | 'email' | 'register' | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  @ViewChild('captchaContainer') captchaContainer?: ElementRef<HTMLDivElement>;

  captchaVerifier?: RecaptchaVerifier;

  ngAfterViewInit(): void {
    this.captchaVerifier = new RecaptchaVerifier(
      this.captchaContainer!.nativeElement,
      {},
      this.auth.auth
    );
  }

  ngOnInit(): void {}

  submitEmailForm() {
    if (this.emailForm.invalid) return;
    const { email, password } = this.emailForm.value;
    if (this.loginType === 'email') {
      this.auth
        .iniciarSesionEmail(email!, password!)
        .then((user) => {
          this.messageService.add({
            summary: 'Éxito!',
            severity: 'success',
            detail: 'Sesión iniciada correctamente',
          });
          this.router.navigateByUrl('/');
        })
        .catch((err) => {
          this.messageService.add({
            summary: 'Error!',
            severity: 'error',
            detail: 'Credenciales inválidas',
          });
        });
    } else {
      this.auth
        .registerEmail(email!, password!)
        .then((user) => {
          this.messageService.add({
            summary: 'Éxito!',
            severity: 'success',
            detail: 'Sesión iniciada correctamente',
          });
          this.router.navigateByUrl('/');
        })
        .catch((err) => {
          this.messageService.add({
            summary: 'Error!',
            severity: 'error',
            detail: 'No pudo registrarse esa cuenta!',
          });
        });
    }
  }

  confirmationResult?: ConfirmationResult;

  async submitPhoneForm() {
    if (this.phoneForm.invalid) return;
    const { number } = this.phoneForm.value;
    this.confirmationResult = await this.auth.iniciarSesion(
      `+52${number!}`,
      this.captchaVerifier!
    );
  }

  async submitOTP() {
    if (this.otpForm.invalid) return;
    const { code } = this.otpForm.value;
    this.confirmationResult
      ?.confirm(code!)
      .then(() => {
        this.messageService.add({
          summary: 'Éxito!',
          severity: 'success',
          detail: 'Sesión iniciada correctamente',
        });
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.messageService.add({
          summary: 'Error!',
          severity: 'error',
          detail: 'Código inválido',
        });
      });
  }
}
