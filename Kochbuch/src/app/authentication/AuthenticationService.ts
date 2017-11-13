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
	public authenticated: Subject<Boolean>;
	public get currentUser() {
		return this.user;
	}
	private get user() { return JSON.parse(localStorage.getItem("user")); }
	private set user(user) {
		localStorage.setItem("user", JSON.stringify(user));
	}
	public constructor(private http: HttpClient, private tokenService: TokenService) {
		console.log("auth created", tokenService.Token,tokenService.Token==null);
		this.authenticated = new BehaviorSubject(!new Boolean(tokenService.Token));
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
				this.user=data;
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
		this.user = null;
		this.tokenService.Token = null;
		this.authenticated.next(false);
	}
	public debugSetLogin(loggedIn: boolean): void {
		console.log("deprecated");
	}
}




