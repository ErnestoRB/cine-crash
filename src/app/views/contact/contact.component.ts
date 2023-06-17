import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  success: boolean = false;
  form!: FormGroup;
  showLoading: boolean = false;
  emailError: boolean = false;

  constructor(private backendService: BackendService) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'textarea': new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  sendEmail(): void{
    this.showLoading = true;
    const body = {
      email: this.form.value.email,
      message: this.form.value.textarea
    };
    this.backendService.sendContactEmail(body).subscribe(res => {
      console.log(res);
      this.success = true;
      this.showLoading = false;
    },
    (error) => {
      console.log(error);
      this.emailError = true;
      this.showLoading = false;
    })
  }

}
