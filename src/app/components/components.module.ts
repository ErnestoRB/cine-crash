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
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './firebase/login/login.component';
import { RegisterComponent } from './firebase/register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { DividerModule } from 'primeng/divider';
import { PhoneComponent } from './firebase/login/phone/phone.component';
import { EmailComponent } from './firebase/login/email/email.component';
import { PanelComponent } from './panel/panel.component';
import { QrInfoComponent } from './qr-info/qr-info.component';
import { PopularHoursComponent } from './purchases-charts/popular-hours.component';
import { ChartModule } from 'primeng/chart';
import { PurchasesClientComponent } from './purchases-client/purchases-client.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { PhoneLinkComponent } from './phone-link/phone-link.component';

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
    ChartsComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    PhoneComponent,
    EmailComponent,
    PanelComponent,
    QrInfoComponent,
    PopularHoursComponent,
    PurchasesClientComponent,
    AccessibilityComponent,
    PhoneLinkComponent,
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
    UserListComponent,
    PopularHoursComponent,
    ChartsComponent,
    PurchasesClientComponent,
    AccessibilityComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    TableModule,
    MessageModule,
    CalendarModule,
    MenuModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressSpinnerModule,
    QRCodeModule,
    ChartModule,
    ButtonModule,
    PanelModule,
  ],
})
export class ComponentsModule {}
