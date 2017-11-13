import { User } from "app/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class RegistrierungsService {

    private static SERVER = environment.backendUrl;

    constructor(private http: HttpClient) { }

    registerUser(email, username, mPw, pw) {
        return this.http.post(environment.backendUrl + "/user/registration", {
            email: email,
            matchinPassword: mPw,
            password: pw,
            userName: username
        });
    }
}
