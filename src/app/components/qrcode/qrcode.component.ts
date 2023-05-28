import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.sass'],
})

export class QrcodeComponent implements OnInit {
  public integrants=[
    {URL:"https://youtu.be/DmCZoiCp5C0"},
    {URL:"https://youtu.be/4TOpS3cdb3c"},
    {URL:"https://youtu.be/CUfLSjxsKF4"},
    {URL:"https://youtu.be/v0d0id78XdE"}
 ];
  public string: any;
  


  constructor() {
    this.string=this.updateRandomURL();
    
  }

  ngOnInit(){
    /*setInterval(() => { 

    //se actualiza cada 5 segundos
    this.string=this.updateRandomURL();
  },5000);*/
}
updateRandomURL(){
  const r=Math.floor(Math.random()*(this.integrants.length -1))+0;
  return this.integrants[r];
  
  
}

getIntegrants(){
  return this.string.URL;

 }

}
