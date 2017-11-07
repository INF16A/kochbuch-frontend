import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../alle-rezepte/alle-rezepte.service';
import { User } from 'app/user.model';

/**
 * @author Yoco Harrmann
 * @author Robert Zebec
 * @author André Berberich
 */

@Injectable()
export class UserProfileService {

    private static SERVER = 'http://localhost:8080';
    private subject = new Subject<any>();

    constructor(private http: Http) { }

    getRecipiesForUser(userId: Number): Promise<Recipe[]>{
      return this.http.get(UserProfileService.SERVER + '/recipes/creator/' + userId)
      .toPromise()
      .then(response => response.json() as Recipe[]);
    }

    getUser(userId: Number): Promise<User>{
      return this.http.get(UserProfileService.SERVER + '/user/' + userId)
      .toPromise()
      .then(response => response.json() as User);
    }
  }
