import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TokenService } from "./token-service";
import {Router} from "@angular/router";
/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Leandro Späth
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService, private router: Router) {
    }
    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("intercept", this.tokenService.Token);
        let result = null;
        if (this.tokenService.Token) {
            const authReq = req.clone({ setHeaders: { "X-Token": this.tokenService.Token } });
            result = next.handle(authReq);
        } else {
            result = next.handle(req);
        }

        return result.map((event: HttpEvent<any>) => {
          console.log(event);
            if(event instanceof HttpResponse && event.status === 401) {
              this.router.navigateByUrl("/login");
            }
            return event;
        });
    }
}
