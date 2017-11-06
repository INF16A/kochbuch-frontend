import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../authentication/AuthenticationService";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private AuthorizationService: AuthenticationService) { }

  ngOnInit() {
  }
  isLoggedIn() {
    return this.AuthorizationService.authenticated;
  }
  logout() {
    this.AuthorizationService.logout();
  }
  getName() {
    if (this.AuthorizationService.currentUser) {
      return this.AuthorizationService.currentUser.username;
    }
  }
}
