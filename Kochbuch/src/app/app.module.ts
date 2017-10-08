import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import { RezeptansichtComponent } from './rezeptansicht/rezeptansicht.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { RegistrierungsmodalComponent } from './registrierungsmodal/registrierungsmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    RezeptansichtComponent,
    RegistrierungsmodalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
