import { Component, OnInit } from '@angular/core';
import { UserDetails, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements OnInit {
  users: UserDetails[] | null = null;
  constructor(users: UsersService) {
    users.getUsers().subscribe((registeredUsers) => {
      this.users = registeredUsers;
    });
  }

  ngOnInit(): void {}
}
