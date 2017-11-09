import { HttpClient } from '@angular/common/http';
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


  constructor(private http: HttpClient) { }

  getRecipiesForUser(userId: Number): Promise<Recipe[]> {
    return this.http.get<Recipe[]>(environment.backendUrl + '/recipes/creator/' + userId)
      .toPromise()
  }

  getUser(userId: Number): Promise<User> {
    return this.http.get<User>(environment.backendUrl + '/user/' + userId)
      .toPromise()
  }
}
