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

    private static SERVER = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getRecipiesForUser(userId: Number): Promise<Recipe[]> {
      return this.http.get<Recipe[]>(UserProfileService.SERVER + '/recipes/creator/' + userId)
      .toPromise()
      .catch(this.error);
    }

    getUser(userId: Number): Promise<User> {
      return this.http.get<User>(UserProfileService.SERVER + '/user/' + userId)
      .toPromise()
      .catch();
    }

    private error(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }
  }
