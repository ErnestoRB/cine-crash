import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TMDBAtributtionComponent } from './tmdb-atributtion/tmdb-atributtion.component';
import { HomeComponent } from './routes/home/home.component';
import { AboutUsComponent } from './routes/about-us/about-us.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { BuyComponent } from './routes/buy/buy.component';
import { HistoryComponent } from './routes/history/history.component';
import { MovieComponent } from './routes/movie/movie.component';
import { MasonryComponent } from './masonry/masonry.component';
import { SelectDateComponent } from './select-date/select-date.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
