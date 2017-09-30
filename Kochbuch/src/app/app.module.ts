import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RezeptansichtComponent } from './rezeptansicht/rezeptansicht.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { RezeptlisteComponent } from './rezeptliste/rezeptliste.component';
import { DifficultyPipe } from './difficulty.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RezeptansichtComponent,
    RezeptlisteComponent,
    DifficultyPipe
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
