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
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { ButtonModule } from 'primeng/button';
import {PanelModule} from 'primeng/panel';

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
    AccessibilityComponent,
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
    AccessibilityComponent
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
    ProgressSpinnerModule,
    ButtonModule,
    PanelModule
  ],
})
export class ComponentsModule {}
