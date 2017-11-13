/**
 * @author André Berberich
 * @author Robert Zebec
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../alle-rezepte/alle-rezepte.service';
import { User } from 'app/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class UserProfileService {

    constructor(private http: HttpClient) { }

    getRecipiesForUser(userId: Number): Promise<Recipe[]> {
      return this.http.get<Recipe[]>(environment.backendUrl + '/recipes/creator/' + userId)
      .toPromise()
      .catch(this.error);
    }

    getUser(userId: Number): Promise<User> {
      return this.http.get<User>(environment.backendUrl + '/user/' + userId)
      .toPromise()
      .catch();
    }

    private error(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }
  }
