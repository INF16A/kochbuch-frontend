import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import { User } from '../user.model';
/**
 * @author Patrick Hahn
 * @author Alexander Krieg
 */
export class AuthenticationService
{
	public authenticated: Subject<boolean>;
	public currentUser: User = null;

	public constructor() {
		this.authenticated = new BehaviorSubject(false);
	}

	public debugSetLogin(loggedIn: boolean): void {
		this.authenticated.next(loggedIn);
		if(loggedIn){
			this.currentUser = new User(1);
		}else{
			this.currentUser = null;
		}
	}
}