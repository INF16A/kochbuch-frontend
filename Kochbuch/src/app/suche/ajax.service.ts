import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

/** @author Team Chrocorg: Yoco Harrmann, Christian Werner und Georg Frey
 *  @author Jarno Wagner, Philipp Steigler, Roman Würtemberger, Yoco Harrmann
 */

@Injectable()
export class AjaxService {

  constructor(private http: Http) {
  }

  /** @author Team Chrocorg: Yoco Harrmann, Christian Werner und Georg Frey */

  getRezepteByTag(tag: string): Observable<Array<any>> {
    return this.http.get("http://localhost:8080/recipes/{tag}?tag=" + tag)
      .map(res => res.json());
  }

  getRezepteByName(name: string): Observable<Array<any>> {
    return this.http.get("http://localhost:8080/recipes/{name}?name=" + name)
      .map(res => res.json());
  }



  /** @author Jarno Wagner, Philipp Steigler, Roman Würtemberger, Yoco Harrmann   */

  getRezepteByUser(user: string): Observable<Array<any>> {
    return this.http.get("http://localhost:8080/recipes/search?user=" + user)
      .map(res => res.json());
  }

  getRezepteByIngredient(ingredient: string): Observable<Array<any>> {
    return this.http.get("http://localhost:8080/recipes/search?ingredient=" + ingredient)
      .map(res => res.json());
  }

}
