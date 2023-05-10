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
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { ShowMoviesComponent } from './components/show-movies/show-movies.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
