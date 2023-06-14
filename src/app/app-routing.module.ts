import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  AboutUsComponent,
  SignUpComponent,
  BuyComponent,
  HistoryComponent,
  MovieComponent,
  SignInComponent,
  CandyStoreComponent,
} from '@views';
import { ShowMoviesComponent } from './components/show-movies/show-movies.component';
import { AuthGuard } from './guards/auth.guard';
import { ChartsComponent } from './components/charts/charts.component';

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
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'signin',
    component: SignInComponent,
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
    path: 'history',
    component: HistoryComponent,
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
