import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RezeptansichtComponent} from './rezeptansicht/rezeptansicht.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RegistrierungsmodalComponent} from './registrierungsmodal/registrierungsmodal.component';
import {RezeptlisteComponent} from './rezeptliste/rezeptliste.component';
import {DifficultyPipe} from './difficulty.pipe';
import {IngredientService} from './ingredient/ingredient.service';
import {AddingredientmodalComponent} from './ingredient/addingredientmodal/addingredientmodal.component';
import {IngredientUnitPipe} from './ingredient/ingredientunit.pipe';
import {AlleRezepteComponent} from './alle-rezepte/alle-rezepte.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RezeptanlegenComponent} from './rezeptanlegen/rezeptanlegen.component';
import {RezeptansichtService} from "./rezeptansicht/rezeptansicht.service";
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {AuthenticationService} from "./authentication/AuthenticationService";
// import { RecipeServie } from './alle-rezepte/alle-rezepte.service';


// import { LOCALE_ID } from '@angular/core';
import { LoginComponent } from './login/login.component';

import {RecipeServie} from './alle-rezepte/alle-rezepte.service';
import {Autosize} from "angular2-autosize";
import {ShowerrorsComponent} from './rezeptanlegen/showerrors.component';
import {DragAndDropDirective} from "./rezeptanlegen/dnd.directive";
import {InputTextareaTexTrimDirective} from "./rezeptanlegen/trim.directive";
import {LOCALE_ID} from '@angular/core';
import {SucheComponent} from './suche/suche.component';
import {AjaxService} from "./_services/ajax.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MessageService} from "./_services/message.service";
import { UserProfileService } from 'app/user-profile/user-profile.service';


/**
 * @author Thomas Hörner
 * @author Alexander Krieg
 * @author Armin Beck
 */

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
    AddingredientmodalComponent,
    LoginComponent,
    SucheComponent,
    /**
     * @author Thomas Hörner
     */
    Autosize,
    ShowerrorsComponent,
    DragAndDropDirective,
    InputTextareaTexTrimDirective,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    /**
     * @author Thomas Hörner
     */
    ReactiveFormsModule
  ],
  providers: [
    RezeptansichtService,
    AuthenticationService,
    /**
     * @author 💩 Alexander Krieg
     * Für die DatePipe (deutsches Datumsformat)
     */
    {provide: LOCALE_ID, useValue: "de-CH"},
    //Daniel Abel
    RecipeServie,
    IngredientService,
    UserProfileService,
    /** @author Yoco Harrmann */
    AjaxService,
    MessageService
  ],
  /**
   * @author Thomas Hörner
   * Endrit Çallaki
   */
  entryComponents: [AddingredientmodalComponent, RegistrierungsmodalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
