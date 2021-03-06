import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication/AuthenticationService";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Leandro Späth
 */


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: { user: string, pass: string };
  response: any;
  wrongCredentials: boolean;
  constructor(private AuthorizationService: AuthenticationService, private router: Router, private location: Location) { this.model = { user: "", pass: "" }; }

  ngOnInit() {
  }
  isLoggedIn() {
    return this.AuthorizationService.authenticated;
  }
  onSubmit() {
    console.log("submit");
    this.AuthorizationService.tryAuthentification(this.model.user, this.model.pass)
      .do(x => {
        //authentificated
        console.log("auth");
        this.location.back();
      }).subscribe((data) => console.log(data), err => this.wrongCredentials = true);/*.catch((e, r) => {
        console.log("catch");
        this.wrongCredentials = true;
        return r;
      })}*/

  }

}
