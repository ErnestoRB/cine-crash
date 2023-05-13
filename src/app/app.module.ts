import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CardModule } from 'primeng/card';

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
import { DividerModule } from 'primeng/divider';
import { CandyStoreComponent } from './views/candy-store/candy-store.component';
import { MessageModule } from 'primeng/message';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { ShowMoviesComponent } from './components/show-movies/show-movies.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MoviesCardComponent } from './movies-card/movies-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './components/payment/payment.component';
import { StepsModule } from 'primeng/steps';
import { BoletosComponent } from './boletos/boletos.component';
import { ExpiryDateComponent } from './components/expiry-date/expiry-date.component';
import { NextMoviesComponent } from './components/next-movies/next-movies.component';
import { UnsafeUrlPipe } from './pipes/unsafe-url.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
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
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    MenuModule,
    ToastModule,
    HttpClientModule,
    CardModule,
    StepsModule,
    MessageModule,
    DividerModule,
    ProgressSpinnerModule,
    TableModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
