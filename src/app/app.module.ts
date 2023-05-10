import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {
  TMDBAtributtionComponent,
  ExampleComponent,
  SelectDateComponent,
  SideNavComponent,
  HeaderComponent,
} from '@components';
import {
  HomeComponent,
  AboutUsComponent,
  SignUpComponent,
  BuyComponent,
  HistoryComponent,
  MovieComponent,
  MasonryComponent,
  SignInComponent,
} from '@views';
import { CandyStoreComponent } from './views/candy-store/candy-store.component';

import { MoviesCardComponent } from './movies-card/movies-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    HomeComponent,
    AboutUsComponent,
    SignUpComponent,
    BuyComponent,
    HistoryComponent,
    MovieComponent,
    MasonryComponent,
    TMDBAtributtionComponent,
    SelectDateComponent,
    SideNavComponent,
    HeaderComponent,
    SignInComponent,
    CandyStoreComponent,

    MoviesCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
