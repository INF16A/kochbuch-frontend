import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../user.model";
@Injectable()
export class RegistrierungsService {
  private baseUrl = 'http://localhost:8080/user/registration';  // URL to web api

  constructor(private http: HttpClient) {
  }

  create(user: User): Promise<any> {
    return this.http.post(this.baseUrl, user)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
