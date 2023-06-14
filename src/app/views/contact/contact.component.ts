import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  email!: string;
  text!: string;
  success: boolean = false;

  form!: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'textarea': new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  sendEmail(): void{

  }

}
