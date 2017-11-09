import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
export class RatingService {
    constructor(private http: HttpClient) {

    }
    //Kühnlein
    /**
     * Method to run corresponding GET requests
     * @param {number} recipeid
     * get the amount of up-/ downratings when loaded
     */
    public countRatingUp(recipeid: number): Observable<number> {
        return this.http.get<number>(`${environment.backendUrl}/rating/${recipeid}/count/up`)
    }
    public countRatingDown(recipeid: number): Observable<number> {
        return this.http.get<number>(`${environment.backendUrl}/rating/${recipeid}/count/down`)
    }

    /**
     * @param {number} recipeid
     * @param {number} userid
     * get the previously given rating by the current user or 0 if there is none
     */
    public getGivenRating(recipeid: number, userid: number): Observable<number> {
        return this.http.get<number>(`${environment.backendUrl}/rating/${recipeid}/${userid}`);
    }

    /**
     * Posts rating
     * @param {number} recipeid
     * @param {number} userid
     * @param {number} givenRating
     * @param {(update) => void} callback
     */
    public giveRating(recipeid: number, userid: number, givenRating: number): Observable<any> {
        let data = {
            recipeId: recipeid,
            userId: userid,
            value: givenRating
        };
        return this.http.post(environment.backendUrl + "/rating", data);
    }
    //!Kühnlein
}
