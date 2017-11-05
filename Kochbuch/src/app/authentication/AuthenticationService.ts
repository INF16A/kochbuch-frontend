import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpInterceptor, HttpRequest ,HttpHandler} from "@angular/common/http";
import { User } from '../user.model';
/**
 * @author Patrick Hahn
 * @author Alexander Krieg
 * @author Armin Beck
 */
export class AuthenticationService implements HttpInterceptor {
	public authenticated: Subject<boolean>;
	public currentUser: User = null;
	public token: string;

	public constructor() {
		this.authenticated = new BehaviorSubject(false);
	}
	public intercept(req: HttpRequest<any>,next: HttpHandler) {
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
		let z = new Promise((resolve, reject) => {
			const backendLoginUrl = "https://localhost:8080/login";
			let xmp = new XMLHttpRequest();
			xmp.open("POST", backendLoginUrl, true);
			xmp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmp.onload = () => {
				if (xmp.status >= 200 && xmp.status < 300) {
					xmp.getResponseHeader("X-Token");
					resolve(xmp.response);
				} else {
					reject(xmp.statusText);
				}
			};
			xmp.onerror = () => reject(xmp.statusText);
			xmp.send(`username=${encodeURI(username)}&password=${encodeURI(password)}`);
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