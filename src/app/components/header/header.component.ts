import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  name: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  user: User | null = null;

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  signOut(): void {
    this.authService.logOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

  printName(): string {
    return 'Hola';
  }
}
