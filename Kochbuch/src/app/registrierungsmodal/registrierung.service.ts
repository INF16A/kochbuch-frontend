import { User } from "app/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';

/**
 @authors
 Annika Schatz
 Irina Eurich
 Tobias Bloch
 Endrit Çallaki
 Armin Beck
 */

@Injectable()
export class RegistrierungsService {

    private static SERVER = environment.backendUrl;

    constructor(private http: HttpClient) { }

    registerUser(email, username, pw, mPw) {


        return this.http.post(environment.backendUrl + "/user/registration", {
          userName: username,
          password: pw,
          matchingPassword: mPw,
          email: email

        });

    }

}
