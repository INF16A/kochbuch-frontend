import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../RezepteService/rezepte-service';
import { User } from 'app/user.model';
import { environment } from 'environments/environment';

/**
 * @author Yoco Harrmann
 * @author Robert Zebec
 * @author André Berberich
 */

@Injectable()
export class UserProfileService {


  constructor(private http: Http) { }

  getRecipiesForUser(userId: Number): Promise<Recipe[]> {
    return this.http.get(environment.backendUrl + '/recipes/creator/' + userId)
      .toPromise()
      .then(response => response.json() as Recipe[]);
  }

  getUser(userId: Number): Promise<User> {
    return this.http.get(environment.backendUrl + '/user/' + userId)
      .toPromise()
      .then(response => response.json() as User);
  }
}
