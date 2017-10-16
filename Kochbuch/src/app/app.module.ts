import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RezeptansichtComponent } from './rezeptansicht/rezeptansicht.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegistrierungsmodalComponent } from './registrierungsmodal/registrierungsmodal.component';
import { RezeptlisteComponent } from './rezeptliste/rezeptliste.component';
import { DifficultyPipe } from './difficulty.pipe';
import { AlleRezepteComponent } from './alle-rezepte/alle-rezepte.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RezeptanlegenComponent } from './rezeptanlegen/rezeptanlegen.component';
import { RezeptansichtService } from "./rezeptansicht/rezeptansicht.service";

@NgModule({
  declarations: [
    AppComponent,
    RezeptansichtComponent,
    RegistrierungsmodalComponent,
    RezeptlisteComponent,
    DifficultyPipe,
    AlleRezepteComponent,
    UserProfileComponent,
    RezeptanlegenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [RezeptansichtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
