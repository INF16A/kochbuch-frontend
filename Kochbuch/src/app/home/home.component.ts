import { Component, OnInit } from '@angular/core';
import { Recipe } from "../alle-rezepte/alle-rezepte.service";
import { RezeptService } from "app/RezeptService/rezept.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Leandro Späth
 */
  constructor(private RezeptService: RezeptService) { }
  private suchtext: string;


  NewestRecipes: Recipe[];
  BestRecipes: Recipe[];
  ngOnInit() {
    this.RezeptService.getNewest3().subscribe(ar => {
      this.NewestRecipes = ar;
    });
    this.RezeptService.getTop3().subscribe(ar => {
      this.BestRecipes = ar;
    });
  }
}
