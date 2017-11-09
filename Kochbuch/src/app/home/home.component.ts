import { Component, OnInit } from '@angular/core';
import { RecipeServie, Recipe } from "../alle-rezepte/alle-rezepte.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private RecipeService: RecipeServie) { }
  private suchtext : string;


  Rezepte: Recipe[];
  NewestRecipes: Recipe[];
  BestRecipes: Recipe[];
  ngOnInit() {
    this.RecipeService.getAllRecipes(ar => {
      this.Rezepte = ar
      this.NewestRecipes = this.getNewestRecipes();
      this.BestRecipes = this.getBestRecipes();

    });
  }
  getNewestRecipes() {
    //get the newest 6 recipes
    return this.Rezepte.sort((a, b) => a.createDate.valueOf() - b.createDate.valueOf()).slice(0, 6);
  }
  getBestRecipes() {
    // get the 6 most commented recipes
    return this.Rezepte.sort((a, b) => a.comments.length - b.comments.length).slice(0, 6);
  }

}
