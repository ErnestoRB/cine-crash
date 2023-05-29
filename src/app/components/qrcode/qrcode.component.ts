import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.sass'],
})

export class QrcodeComponent implements OnInit {
  /*public integrants=[
    "https://youtu.be/DmCZoiCp5C0",
    "https://youtu.be/4TOpS3cdb3c",
    "https://youtu.be/CUfLSjxsKF4",
    "https://youtu.be/v0d0id78XdE"
 ];*/

  Qrdata:string="";
  
  
  constructor() {}

  ngOnInit():void{}


 boton(){


  
    const url= ['https://youtu.be/v0d0id78XdE', 'https://youtu.be/CUfLSjxsKF4', 'https://youtu.be/4TOpS3cdb3c','https://youtu.be/DmCZoiCp5C0'];
    const edades = [25, 30, 35];
    const emails = ['johndoe@example.com', 'janesmith@example.com', 'michaeljohnson@example.com'];
  
    const index = Math.floor(Math.random() * url.length);
  
    /*console.log(
       nombres[index]+
      edades[index]+
      emails[index])*/

      this.Qrdata=`{nombre:${url[index]}}`;
  
    
  /*const index=Math.floor(Math.random()+this.integrants.length)
  this.Qrdata=JSON.stringify(this.integrants[index]);
  console.log(this.Qrdata);*/
 
 }

}



  



