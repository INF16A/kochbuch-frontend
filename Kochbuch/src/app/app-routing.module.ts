import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: 'rezeptansicht', component: RezeptansichtComponent},
  {
    path: 'user-profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
