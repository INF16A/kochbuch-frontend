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
import { IngredientService } from './ingredient/ingredient.service';
import { AddingredientmodalComponent } from './ingredient/addingredientmodal/addingredientmodal.component';
import { IngredientUnitPipe } from './ingredient/ingredientunit.pipe';
import { AlleRezepteComponent } from './alle-rezepte/alle-rezepte.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RezeptanlegenComponent } from './rezeptanlegen/rezeptanlegen.component';
import { RezeptansichtService } from "./rezeptansicht/rezeptansicht.service";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AuthenticationService} from "./authentication/AuthenticationService";
import { RecipeServie } from './alle-rezepte/alle-rezepte.service';


import { LOCALE_ID } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    RezeptansichtComponent,
    RegistrierungsmodalComponent,
    RezeptlisteComponent,
    DifficultyPipe,
    IngredientUnitPipe,
    AlleRezepteComponent,
    UserProfileComponent,
    RezeptanlegenComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AddingredientmodalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    RezeptansichtService,
    AuthenticationService,
    /**
     * @author 💩 Alexander Krieg
     * Für die DatePipe (deutsches Datumsformat)
     */
    { provide: LOCALE_ID, useValue: "de-CH" },
    //Daniel Abel
    RecipeServie,
    IngredientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
