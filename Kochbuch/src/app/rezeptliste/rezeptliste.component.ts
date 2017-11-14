import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RezeptListItem } from "./RezeptListItem";
import { Recipe } from '../alle-rezepte/alle-rezepte.service';
import { MessageService } from "../_services/message.service";
import { SubscribableOrPromise } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Yoco Harrmann, Christian Werner, Georg Frey
 */

@Component({
  selector: 'app-rezeptliste',
  templateUrl: './rezeptliste.component.html',
  styleUrls: ['./rezeptliste.component.css']
})
export class RezeptlisteComponent implements OnInit, OnDestroy {
  message: any;
  subscription: Subscription;

  @Input() set rezepte(rz: Recipe[]) {
    this.rezepteProcessed = rz.map(x => this.ConvertRecipe(x));
  }
  private rezepteProcessed: RezeptListItem[];

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        this.rezepte = message.map(x => this.ConvertRecipe(x));
        return this.rezepte;
      }
    );
  }
  ConvertRecipe(recipe: Recipe): RezeptListItem {
    console.log(this, recipe);
    let sum = this.getRatingSum((recipe as any).ratings);
    return Object.assign({
      img: recipe.pics[0],
      ratingSum: sum,
    }, recipe) as RezeptListItem;
  }
  getRatingSum(Ratings: { value: number }[]) {
    if (Ratings)
      return Ratings.map(x => x.value).reduce((a, b) => a + b, 0);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // MemoryLeaks vorbeugen
  }
}
