import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { Recipe} from "app/alle-rezepte/alle-rezepte.service";
import { Observable } from 'rxjs/Observable';
/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Leandro Späth
 */

@Injectable()
export class RezeptService {

  constructor(private http:HttpClient) { }

  public getNewest3():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(environment.backendUrl+"/recipe/top3Creationdate");
  }
  public getTop3():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(environment.backendUrl+"/recipe/top3rating");
  }

}
