import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AboutUsComponent } from './routes/about-us/about-us.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { MovieComponent } from './routes/movie/movie.component';
import { BuyComponent } from './routes/buy/buy.component';
import { HistoryComponent } from './routes/history/history.component';
import { MasonryComponent } from './masonry/masonry.component';

const routes: Routes = [
  {
    path: '',
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
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'buy',
    component: BuyComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'masonry',
    component: MasonryComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
