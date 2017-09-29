import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";
import {RezeptanlegenComponent} from "./rezeptanlegen/rezeptanlegen.component";

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: 'rezeptansicht', component: RezeptansichtComponent},
  {path: 'rezeptanlegen', component: RezeptanlegenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
