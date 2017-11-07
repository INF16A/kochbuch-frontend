/**
@author Yoco Harrmann
@author Robert Zebec
@author André Berberich
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { Recipe } from '../alle-rezepte/alle-rezepte.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'app/user.model';
import { AuthenticationService } from 'app/authentication/AuthenticationService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  recipies: Recipe[];
  currentUser: User;
  userId: Number;
  sub: Subscription;
  isLoggedIn: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserProfileService,
    private authService: AuthenticationService ) {
    }

  ngOnInit() {
      this.sub = this.route.params.subscribe(
        (params:Params) => {
          this.updateUserData(params);
        }
      );

      this.authService.authenticated.subscribe((params: boolean) => {
        this.isLoggedIn = params;
      });
      this.authService.debugSetLogin(true);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private updateUserData(params: Params) {
    this.userId = + params['id'];
    this.loadUser(this.userId);
    this.loadRecipiesForUser(this.userId);
  }

  private loadRecipiesForUser(userId: Number) {
    this.service.getRecipiesForUser(userId).then( recipies => {
      this.recipies = recipies;
    });
  }

  private loadUser(userId: Number) {
    this.service.getUser(userId).then( user => {
      this.currentUser = user;
    });
  }
}
