/**
@author Yoco Harrmann
@author Robert Zebec
@author André Berberich
*/
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { Recipe, RecipeServie } from '../alle-rezepte/alle-rezepte.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  rezepte: Recipe[];

  constructor( private service: RecipeServie ) { }

  ngOnInit() {
      this.loadRecipiesForUser();
  }

  private loadRecipiesForUser(){
    this.service.getAllRecipes( rezepte => {
      this.rezepte = rezepte;
    });
  }
}
