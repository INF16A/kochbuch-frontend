import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RezeptansichtComponent} from "./rezeptansicht/rezeptansicht.component";

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: 'rezeptansicht', component: RezeptansichtComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
