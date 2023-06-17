import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  User,
  linkWithPhoneNumber,
} from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { UsersService } from 'src/app/services/users.service';
import { TakenPhoneValidator } from 'src/app/validators/taken-phone.validator';

@Component({
  selector: 'app-phone-link',
  templateUrl: './phone-link.component.html',
  styleUrls: ['./phone-link.component.sass'],
})
export class PhoneLinkComponent implements OnInit {
  @ViewChild('captchaContainer') captchaContainer?: ElementRef<HTMLDivElement>;
  captchaVerifier?: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;
  user: User | null = null;

  phoneForm = this.fb.group({
    number: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      [TakenPhoneValidator.createValidator(this.backendService)],
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
    try {
      const { number } = this.phoneForm.value;
      this.user = this.auth.auth.currentUser;
      if (!this.user) {
        this.messageService.add({
          summary: 'Error!',
          severity: 'error',
          detail: 'No estás logueado!',
        });
        return;
      }
      this.confirmationResult = await linkWithPhoneNumber(
        this.user,
        `+52${number!}`,
        this.captchaVerifier!
      );
    } catch (error: any) {
      this.messageService.add({
        summary: 'Error!',
        severity: 'error',
        detail: 'Error al vincular tu numero de teléfono',
      });
    }
  }

  async submitOTP() {
    const { code } = this.otpForm.value;
    const { number } = this.phoneForm.value;
    const ctd = await this.confirmationResult!.confirm(code!);
    await this.users.registerPhoneOnDetails(ctd.user.uid, `+52${number!}`);
    this.messageService.add({
      summary: 'Éxito!',
      severity: 'success',
      detail: '¡Teléfono vinculado correctamente!',
    });

    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
