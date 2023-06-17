import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { StepsModule } from 'primeng/steps';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';

import {
  HomeComponent,
  AboutUsComponent,
  SignUpComponent,
  BuyComponent,
  HistoryComponent,
  MovieComponent,
  SignInComponent,
  ContactComponent,
} from '@views';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AdministrationComponent } from './views/administration/administration.component';
import { ChartsComponent } from './views/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    SignInComponent,
    SignUpComponent,
    BuyComponent,
    HistoryComponent,
    MovieComponent,
    QrcodeComponent,
    AdministrationComponent,
    ContactComponent,
    ChartsComponent,
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
    AvatarModule,
    FieldsetModule,
    CardModule,
    StepsModule,
    MessageModule,
    DividerModule,
    ProgressSpinnerModule,
    TableModule,
    ComponentsModule,
    QRCodeModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
