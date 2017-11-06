import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";
import {AlleRezepteComponent} from "./alle-rezepte/alle-rezepte.component";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RezeptanlegenComponent} from "./rezeptanlegen/rezeptanlegen.component";
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SucheComponent} from './suche/suche.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'rezeptansicht/:id', component: RezeptansichtComponent},
  {path: 'rezeptliste', component: AlleRezepteComponent},
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {path: 'rezeptanlegen', component: RezeptanlegenComponent},
  {path: 'home', component: HomeComponent},
  /** @author Yoco Harrmann*/
  {
    path: 'suche',
    component: SucheComponent
  },
  /* Ende Yoco-san */
  {path: 'home', component: HomeComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
