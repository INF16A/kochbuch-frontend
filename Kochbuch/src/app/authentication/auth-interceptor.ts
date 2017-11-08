import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TokenService } from "./token-service";
/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Leandro Späth
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {
    }
    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.tokenService.Token) {
            req.headers.set("X-Token", this.tokenService.Token);
        }
        return next.handle(req);
    }
}