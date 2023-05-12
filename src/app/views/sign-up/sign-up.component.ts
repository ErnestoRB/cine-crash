import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginOutService } from 'src/app/services/login-out.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  success = false;


  constructor(private loginService: LoginOutService) { 
    this.form = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name': new FormControl('', [ Validators.required, Validators.minLength(3)]),
      'lastname': new FormControl('', [ Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', [ Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'password2': new FormControl('', [Validators.required, this.validatePass])
    });
  }

  ngOnInit(): void {
  }

  signUpUser(): void{
    this.loginService.addUser(this.form.value);
    this.form.reset();
    this.success = true;
  }

  validatePass(control: FormControl): {[s: string]: boolean} | null{
    const form = control.parent;
    if (form && control.value !== form.get('password')?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

}
