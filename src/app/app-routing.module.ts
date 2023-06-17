import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  AboutUsComponent,
  BuyComponent,
  HistoryComponent,
  MovieComponent,
  CandyStoreComponent,
  ContactComponent,
} from '@views';
import { ShowMoviesComponent } from './components/show-movies/show-movies.component';
import { AuthGuard } from './guards/auth.guard';
import { ChartsComponent } from './views/charts/charts.component';
import { LoginComponent } from './components/firebase/login/login.component';
import { AdministrationComponent } from './views/administration/administration.component';
import { PanelComponent } from './components/panel/panel.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'buy/:id',
    component: BuyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'candy-store',
    component: CandyStoreComponent,
  },
  {
    path: 'show-movies/:movieSearch',
    component: ShowMoviesComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
