import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "./token-service";

/**
 * @author Patrick Hahn
 * @author Alexander Krieg
 * @author Armin Beck
 * @author Leandro Späth
 */
@Injectable()
export class AuthenticationService {
	public authenticated: Subject<boolean>;
	public currentUser: User = null;
	public constructor(private http: HttpClient, private tokenService: TokenService) {
		this.authenticated = new BehaviorSubject(false);
	}

	public tryAuthentification(username: string, password: string) {
		const backendLoginUrl = environment.backendUrl + "/login";
		return this.http.post(backendLoginUrl,
			`username=${encodeURI(username)}&password=${encodeURI(password)}`,
			{
				headers: new HttpHeaders()
					.set('Content-Type', 'application/x-www-form-urlencoded'),
				observe: 'response',
			}
		).do(z => {
			let xtoken = z.headers.get("X-Token");
			let data: any = z.body;
			if (data.id && data.username && xtoken) {
				this.currentUser = new User(data.id);
				this.currentUser.username = data.username;
				this.tokenService.Token = xtoken;
				console.log("user logged in", this.currentUser);
				this.authenticated.next(true);
			}
			else {
				console.log(z.body);
				throw new Error("insufficient data loaded");
			}
		});
	}
	public logout() {
		console.log("logout");
		this.currentUser = null;
		this.tokenService.Token = null;
		this.authenticated.next(false);
	}
	public debugSetLogin(loggedIn: boolean): void {
		this.authenticated.next(loggedIn);
		if (loggedIn) {
			this.currentUser = new User(1);
		} else {
			this.currentUser = null;
		}
	}
}




