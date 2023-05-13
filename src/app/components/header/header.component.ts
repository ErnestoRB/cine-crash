import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginOutService } from 'src/app/services/login-out.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  name: string = '';

  constructor(private loginService: LoginOutService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.isLogged.subscribe(
      (isLogged) => (this.isLogged = isLogged)
    );
    console.log(this.isLogged);
  }

  isLogged: boolean = false;

  signOut(): void {
    this.loginService.removeSession();
    this.router.navigate(['/home']);
  }

  printName(): string {
    return this.loginService.getName();
  }
}
