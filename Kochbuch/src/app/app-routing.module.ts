import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";
import {AlleRezepteComponent} from "./alle-rezepte/alle-rezepte.component";
const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: 'rezeptansicht', component: RezeptansichtComponent},
  {path: 'rezeptliste', component: AlleRezepteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
