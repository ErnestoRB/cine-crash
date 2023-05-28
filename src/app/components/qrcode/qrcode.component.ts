import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.sass'],




})
export class QrcodeComponent implements OnInit {
  private integrants=[
    {src:'/assets/avatar/ernestoAvatar.jpg'},
    {src:'/assets/avatar/ikeravatar.jpg'},
    {src:'/assets/avatar/itzavatar.jpg'},
    {src:'/assets/avatar/pauvatar.jpg' }
  ];
  private currentImage: any;


  constructor() {
    this.currentImage=this.updateRandomImage();
  }

  ngOnInit(){
    setInterval(() => { 

    //se actualiza cada 5 segundos
    this.currentImage=this.updateRandomImage();
  },5000);
}
updateRandomImage(){
  const r=Math.floor(Math.random()*(this.integrants.length -1))+0;
  return this.integrants[r];
}
getIntegrants(){
  return this.currentImage.src;
}
}
