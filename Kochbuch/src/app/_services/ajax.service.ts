import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

/** @author
 * Team Chrocorg: Yoco Harrmann, Christian Werner und Georg Frey
 */

@Injectable()
export class AjaxService {

  constructor(private http: Http) {
  }

  getRezepteByTag(tag: string): Observable<Array<any>> {
    return this.http.get("http://localhost:8080/recipes/{tag}?tag=" + tag)
      .map(res => res.json());
  }

  getRezepteByName(name: string): Observable<Array<any>> {
    return this.http.get("http://localhost:8080/recipes/{name}?name=" + name)
      .map(res => res.json());
  }

}
