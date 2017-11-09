import { Ingredient } from '../ingredient/ingredient.model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { Recipe, RezepteService } from "app/RezepteService/rezepte-service";
import { environment } from "environments/environment";

/**
 * @author Alexander Krieg
 * @author Patrick Hahn
 * @author Leandro Späth
 * @author Armin Beck
 */
/**
 * 💩 Alexander Krieg
 * Representiert ein Kommentar-Objekt
 */
export class Comment {
    public id: Number;
    public user: User;
    constructor(
        public text: String,
        public user_id: Number,
        public recipe_id: Number,
        public creationDate: Date
    ) { }
}
export class KommentarService {
    constructor(private http: HttpClient) {

    }
    public getRecipeComments(recipeId: Number): Observable<Comment[]> {
        let url = environment.backendUrl + "/comments/" + recipeId;
        return this.http.get<Comment[]>(url);
    }

    /**
     * 💩 Alexander Krieg
     * Führt einen Post-Request aus, um ein neuen Kommentar hinzuzufügen.
     * @param comment: Der Kommentar der hinzugefügt werden soll.
     * @param callback: Wird aufgerufen sobald eine Antwort vom Server kommt
     */
    public addComment(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(environment.backendUrl + "/comment", comment);
    }
    /**
     * 💩 Alexander Krieg
     * Marc Reinke
     * Führt einen Post-Request aus, um ein Kommenar zu löschen.
     * @param comment: Der Kommentar der hinzugefügt werden soll.
     * @param callback: Wird aufgerufen sobald eine Antwort vom Server kommt
     */
    public deleteComment(comment: Comment): Observable<any> {
        return this.http.delete(environment.backendUrl + "/comment/" + comment.id);
    }
}
