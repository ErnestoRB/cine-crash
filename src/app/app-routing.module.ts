import { NgModule } from '@angular/core';
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
import { LoginComponent } from './components/firebase/login/login.component';
import { AdministrationComponent } from './views/administration/administration.component';

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
    path: 'admin',
    component: AdministrationComponent,
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
