import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";
import { RezeptlisteComponent} from "./rezeptliste/rezeptliste.component";
const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: 'rezeptansicht', component: RezeptansichtComponent},
  {path: 'rezeptliste', component: RezeptlisteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
