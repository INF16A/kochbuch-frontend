import { Ingredient } from '../ingredient/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RezeptansichtService, Comment } from "./rezeptansicht.service";
import { DatePipe,DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { Recipe, RecipeServie} from '../alle-rezepte/alle-rezepte.service'

/**
 * @author Alexander Krieg
 * @author Theresa Reus
 * @author Patrick Eichert
 * @author Leandro Späth
 * @author Tim Kühnlein
 * @author Adrian Haase
 * @author Adrian Dumke
 * @author André Berberich
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
    private authService: AuthenticationService,
    private reService:RecipeServie) {
  }

  currentRecipe : Recipe = new Recipe;
  personCount: number = 4;

  //Kühnlein
  upratings:number=0;
  downratings:number=0;
  givenRating:number=0;
  //!Kühnlein

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
  private sumkcal:number = 0;


  ngOnInit() {

    // TODO: MockData kann dann raus sobald es eine ordentliche Rezeptklasse gibt
    // this.rezeptAnsichtService.getRecipeData(0).subscribe(data => {
    //   this.currentRecipe = data;
    // });
    console.log(this.authService.authenticated);

    /**
     * Patrick Eichert, Theresa Reus
     * holt Rezept ID aus der aufgerufenen URL
     */
    this.sub = this.route.params.subscribe(
      (params:Params) => {
       this.recipeid = + params["id"];
      }
    );

    this.loadRecipe(this.recipeid);

    this.authService.authenticated.subscribe((params:boolean) => {
      this.isLoggedIn = params;
    });
    this.authService.debugSetLogin(true);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Theresa Reus, Patrick Eichert
   * Lädt das Rezept zu der aktuellen Rezept-ID
   * @param {number} id
   */
  private loadRecipe(id: number) {
    this.rezeptAnsichtService.getRecipeData(id, recipe => {
      this.currentRecipe = recipe;
      this.recipe = recipe;
      this.loadComments();
      this.sumkcalpp();
      this.updateRating();
      this.updateGivenRating();
    });
  }

  /**
   * Theresa Reus, Patrick Eichert
   * berechnet die kcal pro Person auf Grundlage der Zutaten
   */
  private sumkcalpp() {
    let sum : number = 0;
    for (let recipeIngredients of this.currentRecipe.recipeIngredients) {
      sum += (recipeIngredients.amountPerPerson * recipeIngredients.ingredient.kcalPerUnit);
    }
    this.sumkcal = sum;
  }

  private loadComments(){
    this.commentsLoading = true;
    this.rezeptAnsichtService.getRecipeComments(this.recipe.id, comments => {
      this.commentsLoading = false;
      this.comments = comments;
      console.log(this.comments);
    });
  }
  //Marc Reinke
  public saveNewComment(text:String){
    if(!text) return;
    this.commentAdding = true;
    let c = new Comment(text, this.authService.currentUser.id, this.recipe.id, new Date());
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
  public deleteComment(comment:Comment){
    if(!this.authService.currentUser) return;
    console.dir(comment);
    if(comment.user.id === this.authService.currentUser.id){
      this.rezeptAnsichtService.deleteComment(comment, (fail:boolean, data:any) => {
        if(fail){
          console.log("Hallo i bims");
          // console.log(JSON.stringify(data));
        }else{
          this.loadComments();
        }
      });
    }
  }
  // <-- 💩 Alexander Krieg

  /**
   * @author Leandro Späth
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


  //Kühnlein
  /**
   * Updates both offline values of up- and downrating
   */
  private updateRating(){
    this.rezeptAnsichtService.countRatingUp(this.recipe.id, amount => {
      this.upratings = amount;
    });

    this.rezeptAnsichtService.countRatingDown(this.recipe.id, amount => {
      this.downratings = amount;
    });
  }

  /**
   * Updates offline value of logged in user's previously given rating
   */
  private updateGivenRating() {
    if (this.isLoggedIn) {
      this.rezeptAnsichtService.getGivenRating(this.recipe.id, 1 /*TODO: currentuser.id*/, givenRating => {
      this.givenRating = givenRating;
      });
    }
  }

  /**
   * Posts rating
   * @param {number} rating = 1 for like / -1 for dislike
   */
  private giveRating(rating: number){
    if(this.isLoggedIn) {
      this.givenRating = rating;
      this.rezeptAnsichtService.giveRating(this.recipeid, 1 /*TODO: currentuser.id*/, rating, update => {
        this.updateRating();
      });
    }
  }
  //!Kühnlein
}
