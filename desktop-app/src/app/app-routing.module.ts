import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';
import { FriendsComponent } from './components/friends/friends.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageNotFoundComponent } from './shared/components';
import { AuthGuard } from './guard/AuthGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'artist/:id',
    component: ArtistComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
