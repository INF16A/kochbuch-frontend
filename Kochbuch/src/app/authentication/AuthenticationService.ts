import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
/**
 * @author Patrick Hahn
 */
export class AuthenticationService
{
	public authenticated: Subject<boolean>;

	public constructor() {
		this.authenticated = new BehaviorSubject(false);
	}

	public debugSetLogin(loggedIn: boolean): void {
		this.authenticated.next(loggedIn);
	}
}