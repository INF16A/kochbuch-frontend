import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { User } from '../user.model';
import { Injectable } from '@angular/core';
/**
 * @author Patrick Hahn
 * @author Alexander Krieg
 * @author Armin Beck
 */

 @Injectable()
export class AuthenticationService implements HttpInterceptor {
	public authenticated: Subject<boolean>;
	public currentUser: User = null;
	public token: string;

	public constructor(private http: Http) {
		this.authenticated = new BehaviorSubject(false);
	}
	public intercept(req: HttpRequest<any>, next: HttpHandler) {
		//TODO this 'if' might has to be replaced
		if (this.token) {
			if (req.headers.has("X-Token")) {
				req.headers.set("X-Token", this.token);
			}
			else {
				req.headers.append("X-Token", this.token);
			}
		}
		return next.handle(req);
	}
	public tryAuthentification(username: string, password: string) {
		const backendLoginUrl = "https://localhost:8080/login";
		this.http.post(backendLoginUrl, `username=${encodeURI(username)}&password=${encodeURI(password)}`,
			{
				params: {
					"ContentType": "application/x-www-form-urlencoded"
				}
			})._do(z => {
				let xtoken = z.headers.get("X-Token");
				let data = z.json()
				if (data.id && data.username && xtoken) {
					this.currentUser = new User(data.id);
					this.currentUser.username = data.username;
					this.token = xtoken;
				}
				else {
					throw new Error("insufficient data loaded");
				}
			});
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