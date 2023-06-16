import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  success: boolean = false;
  form!: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'textarea': new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  sendEmail(): void{
    const body = {
      email: this.form.value.email,
      message: this.form.value.textarea
    };
    this.http.post('http://localhost:4000/api/contact', body).subscribe(res => {
      console.log(res);
    },
    (error) =>{
      console.log(error);
    })
  }

}
