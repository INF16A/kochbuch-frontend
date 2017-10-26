import { Component, OnInit, OnDestroy } from '@angular/core';
import { RezeptansichtService, Comment } from "./rezeptansicht.service";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { Recipe } from '../alle-rezepte/alle-rezepte.service'
import {Ingredient} from "../ingredient.model";

/**
 * @author Alexander Krieg
 * @author Theresa Reus
 * @author Patrick Eichert
 */


@Component({
  selector: 'app-rezeptansicht',
  templateUrl: './rezeptansicht.component.html',
  styleUrls: ['./rezeptansicht.component.css']
})
export class RezeptansichtComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rezeptAnsichtService: RezeptansichtService,
    private authService: AuthenticationService ) {
  }

  currentRecipe = {};
  unit : String [] = [];
  personCount: number = 4;

  // --> 💩 Alexander Krieg
  private commentsLoading = true;
  private comments:Comment[] = [];
  private sub: Subscription;
  private recipe: Recipe;
  private recipeid: number;
  private newCommentText: String = "";
  private commentAdding:boolean = false;
  private isLoggedIn:boolean = false;
  private ingredients: Ingredient[];


  ngOnInit() {

    // TODO: MockData kann dann raus sobald es eine ordentliche Rezeptklasse gibt
    // this.rezeptAnsichtService.getRecipeData(0).subscribe(data => {
    //   this.currentRecipe = data;
    // });
    console.log(this.authService.authenticated);
    this.unit[0] = "";
    this.unit[1] = "Stck";
    this.unit[2] = "g";
    this.unit[3] = "Prise";
    this.unit[4] = "TL";
    this.unit[5] = "EL";
    this.unit[6] = "ml";

    // Patrick Eichert, Theresa Reus
    // holt ID aus der URL
    this.sub = this.route.params.subscribe(
      (params:Params) => {
       this.recipeid = + params["id"];
      }
    );

    this.loadRecipe(this.recipeid);

    // this.sub = this.route.queryParams.subscribe((id: number) => {
    //   this.recipeid = id;
    //   console.log(this.recipeid);
    //   //this.loadComments();
    // });

    this.authService.authenticated.subscribe((params:boolean) => {
      this.isLoggedIn = params;
    });
    this.authService.debugSetLogin(true);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Theresa Reus, Patrick Eichert
  private loadRecipe(id: number) {
    this.rezeptAnsichtService.getRecipeData(id, recipe => {
      this.currentRecipe = recipe;
    });
  }

  private loadIngredients(id:number) {
    this.rezeptAnsichtService.getIngredientByRecipe(id, ingredients => {
      this.ingredients = ingredients;
    });
  }

  private loadComments(){
    this.commentsLoading = true;
    this.rezeptAnsichtService.getRecipeComments(this.recipe.id, comments => {
      this.commentsLoading = false;
      this.comments = comments;
      console.log(this.comments);
    });
  }

  public saveNewComment(text:String){
    if(!text) return;
    this.commentAdding = true;
    let c = new Comment(text, 1, 1, new Date());
    // let c = new Comment(text, 1, this.recipe.id, new Date());
    console.log("C", c);
    this.rezeptAnsichtService.addComment(c, (fail:boolean, data:any) => {
      if(fail){
        console.error(JSON.stringify(data));
      }else{
        this.newCommentText = "";
        this.loadComments();
      }
      this.commentAdding = false;
    });
  }
  // <-- 💩 Alexander Krieg

  /**
   *  Generates an array containing all numbers from min to max
   *
   *  e.g. range(1,4) returns [1, 2, 3, 4]
   *
   * @param min lower bound of array
   * @param max upper bound of array
   * @returns Array with numbers from min to max
   */

  range(min, max) {
    let items = [];
    for (let i = Math.floor(min); i <= Math.floor(max); i++) {
      items.push(i);
    }
    return items;
  }

}
