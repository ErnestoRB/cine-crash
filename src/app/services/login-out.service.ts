import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginOutService {

  private userdata: User[] = [];
  private name: string = "users";
  private activeUser: string = "activeUser";
  private obj !: User;

  constructor(private usersService: LocalStorageService) { 
    let userdata: User[] | undefined = this.usersService.get(this.name);
    if(!userdata){
      return;
    }
    this.userdata = userdata;
  }

  addUser(user: User): void{
    this.userdata.push(user);
    this.usersService.save(this.name, this.userdata);
  }

  checkUser(user: string, pass: string): boolean{
    const currentUser = this.userdata.find(object => object.username === user && object.password === pass);
    if(currentUser){
      sessionStorage.setItem(this.activeUser, JSON.stringify(currentUser));
      return true;
    }
    else{
      return false;
    }
  }

  isLogged(): boolean{
    if(sessionStorage.getItem(this.activeUser)){
      this.transformObject();
      return true;
    }
    else{
      return false;
    }
  }

  removeSession(): void{
    sessionStorage.removeItem(this.activeUser);
  }

  transformObject(): void{
    const data = sessionStorage.getItem(this.activeUser);
    if(data !== null){
      this.obj = JSON.parse(data); 
    }
  }

  getName(): string{
    return this.obj.name;  
  }

  getUsername(): string{
    return this.obj.username;  
  }

  getLastname(): string{
    return this.obj.lastname;  
  }

  getEmail(): string{
    return this.obj.email;  
  }
}
