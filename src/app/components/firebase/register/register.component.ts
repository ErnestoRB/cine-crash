import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  updateProfile,
} from '@angular/fire/auth';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { UsersService } from 'src/app/services/users.service';
import { TakenPhoneValidator } from 'src/app/validators/taken-phone.validator';

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
      [TakenPhoneValidator.createValidator(this.backendService)],
    ],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: [
      '',
      [Validators.required, Validators.minLength(8), this.validatePass],
    ],
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
    private router: Router,
    private backendService: BackendService
  ) {}

  ngAfterViewInit() {
    this.captchaVerifier = new RecaptchaVerifier(
      this.captchaContainer!.nativeElement,
      {},
      this.auth.auth
    );
    this.captchaVerifier?.render();
  }

  validatePass(control: FormControl): { [s: string]: boolean } | null {
    const form = control.parent;
    if (form && control.value !== form.get('password')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  submit() {
    const { email, password, phone, nombre } = this.form.value;

    this.auth
      .registerEmail(email!, password!)
      .then(async (credentials) => {
        this.messageService.add({
          summary: 'Éxito!',
          severity: 'success',
          detail: 'Correo y contraseña registrados correctamente',
        });
        const user = this.auth.auth.currentUser!;
        await updateProfile(user, { displayName: nombre });
        try {
          this.confirmationResult = await linkWithPhoneNumber(
            user,
            `+52${phone}`!,
            this.captchaVerifier!
          );
        } catch (error: any) {
          this.messageService.add({
            summary: 'Error!',
            severity: 'error',
            detail: 'No pudo vincularse tu numero de teléfono!',
          });
        }
        await this.users.registerPartiaUserDetailsOpt(credentials.user.uid, {
          provider: credentials.providerId,
          email: credentials.user.email,
          name: nombre!,
          // number: credentials.user.phoneNumber ?? `+52${phone}`!,
        });
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

  async submitOTP() {
    const { code } = this.otpForm.value;
    const { phone } = this.form.value;

    const credentials = await this.confirmationResult!.confirm(code!);
    await this.users.registerPhoneOnDetails(
      credentials.user.uid,
      credentials.user.phoneNumber ?? `+52${phone}`
    );
    this.messageService.add({
      summary: 'Éxito!',
      severity: 'success',
      detail: 'Teléfono vinculado correctamente',
    });
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
