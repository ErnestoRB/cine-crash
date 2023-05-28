import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.sass'],
})
export class EmailComponent implements OnInit {
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
    private users: UsersService
  ) {}

  ngOnInit(): void {}

  submit() {
    const { email, password } = this.emailForm.value;

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
  }
}
