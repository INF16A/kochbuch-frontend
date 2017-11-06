import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../alle-rezepte/alle-rezepte.service';

/**
 * @author Yoco Harrmann
 * @author Robert Zebec
 * @author André Berberich
 */

@Injectable()
export class UserProfileService {

    private static SERVER = 'http://localhost:8080';
    private subject = new Subject<any>();
    private recipeList: Recipe[];

    constructor(private http: Http) { }

    private fetchRecipesForUser(){
      let url = UserProfileService.SERVER + '/recipes';
      return this.http.get(url);
    }

    public getRecipesForUser( callback: (ar: Recipe[]) => void){
      this.fetchRecipesForUser().subscribe((res:Response) => {
        this.recipeList = res.json();
        callback(res.json());
    });
  }
}
