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
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
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
    private router: Router,
    private users: UsersService
  ) {}

  @ViewChild('captchaContainer') captchaContainer?: ElementRef<HTMLDivElement>;

  captchaVerifier?: RecaptchaVerifier;

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
        .then(async (credentials) => {
          await this.users.registerUserDetails(credentials.user.uid, {
            provider: credentials.providerId,
            email: credentials.user.email,
            number: credentials.user.phoneNumber,
          });
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
    this.captchaVerifier = new RecaptchaVerifier(
      this.captchaContainer!.nativeElement,
      {},
      this.auth.auth
    );
    this.captchaVerifier?.render();

    this.confirmationResult = await this.auth.iniciarSesion(
      `+52${number!}`,
      this.captchaVerifier!
    );
    this.captchaVerifier?.clear();
  }

  async submitOTP() {
    if (this.otpForm.invalid) return;
    const { code } = this.otpForm.value;
    this.confirmationResult
      ?.confirm(code!)
      .then(async (credentials) => {
        await this.users.registerUserDetails(credentials.user.uid, {
          provider: credentials.providerId,
          email: credentials.user.email,
          number: credentials.user.phoneNumber,
        });
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
