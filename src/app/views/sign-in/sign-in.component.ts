import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginOutService } from 'src/app/services/login-out.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  user: string = '';
  pass: string = '';
  userExists: boolean = true;

  constructor(private loginService: LoginOutService, private router: Router) {
    if (loginService.isSessionAvailabe()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {}

  login(): void {
    this.userExists = this.loginService.checkUser(this.user, this.pass);
    if (this.userExists) {
      this.router.navigate(['/home']);
    }
  }
}
