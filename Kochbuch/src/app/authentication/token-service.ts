import { Injectable } from '@angular/core';

/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Leandro Späth
 */
@Injectable()
export class TokenService {
    private token;
    public get Token() { return this.token }
    public set Token(value: string) { this.token = value; }
}