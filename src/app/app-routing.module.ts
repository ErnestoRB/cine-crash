import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  AboutUsComponent,
  SignUpComponent,
  BuyComponent,
  HistoryComponent,
  MovieComponent,
  MasonryComponent,
  SignInComponent,
  CandyStoreComponent,
} from '@views';

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
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
