import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginOutService } from 'src/app/services/login-out.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  name: string = "";

  constructor(private loginService: LoginOutService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  checkLogged(): boolean{
    return this.loginService.isLogged();
  }

  signOut(): void{
    this.loginService.removeSession();
    this.router.navigate(['/home']);
  }

  printName(): string{
    return this.loginService.getName();
  }

}
