import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";
import {AlleRezepteComponent} from "./alle-rezepte/alle-rezepte.component";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RezeptanlegenComponent} from "./rezeptanlegen/rezeptanlegen.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rezeptliste',
    pathMatch: 'full'
  },
  {path: 'rezeptansicht', component: RezeptansichtComponent},
  {path: 'rezeptliste', component: AlleRezepteComponent},
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {path: 'rezeptanlegen', component: RezeptanlegenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
