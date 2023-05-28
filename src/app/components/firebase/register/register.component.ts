import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  updateProfile,
} from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('captchaContainer') captchaContainer?: ElementRef<HTMLDivElement>;
  captchaVerifier?: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;

  form = this.fb.group({
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  otpForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private users: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.captchaVerifier = new RecaptchaVerifier(
      this.captchaContainer!.nativeElement,
      {},
      this.auth.auth
    );
    this.captchaVerifier?.render();
  }

  submit() {
    const { email, password, phone, nombre } = this.form.value;

    this.auth
      .registerEmail(email!, password!)
      .then(async (credentials) => {
        await this.users.registerUserDetails(credentials.user.uid, {
          provider: credentials.providerId,
          email: credentials.user.email,
          name: nombre!,
          number: credentials.user.phoneNumber,
        });
        const user = this.auth.auth.currentUser!;
        await updateProfile(user, { displayName: nombre });
        this.confirmationResult = await linkWithPhoneNumber(
          user,
          `+52${phone}`!,
          this.captchaVerifier!
        );
      })
      .catch((err) => {
        console.log({ err });

        this.messageService.add({
          summary: 'Error!',
          severity: 'error',
          detail: 'No pudo registrarse esa cuenta!',
        });
      });
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
