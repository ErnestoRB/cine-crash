import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TMDBAtributtionComponent,
  SelectDateComponent,
  SideNavComponent,
  HeaderComponent,
  SearchComponent,
  ShowMoviesComponent,
  MoviesCardComponent,
  PaymentComponent,
  BoletosComponent,
  ExpiryDateComponent,
  NextMoviesComponent,
  FooterComponent,
  MasonryComponent,
  
} from '@components';
import { CandyStoreComponent } from '@views';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UnsafeUrlPipe } from '../pipes/unsafe-url.pipe';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    MasonryComponent,
    TMDBAtributtionComponent,
    SelectDateComponent,
    SideNavComponent,
    HeaderComponent,
    CandyStoreComponent,
    FooterComponent,
    SearchComponent,
    ShowMoviesComponent,
    MoviesCardComponent,
    PaymentComponent,
    BoletosComponent,
    ExpiryDateComponent,
    NextMoviesComponent,
    UnsafeUrlPipe,
   
    
  ],
  exports: [
    MasonryComponent,
    TMDBAtributtionComponent,
    SelectDateComponent,
    SideNavComponent,
    HeaderComponent,
    CandyStoreComponent,
    FooterComponent,
    SearchComponent,
    ShowMoviesComponent,
    MoviesCardComponent,
    PaymentComponent,
    BoletosComponent,
    ExpiryDateComponent,
    NextMoviesComponent,
    UnsafeUrlPipe,
    
    
   
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    MessageModule,
    CalendarModule,
    MenuModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressSpinnerModule
    
  ],
})
export class ComponentsModule {}
