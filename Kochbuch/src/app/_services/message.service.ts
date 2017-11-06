import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

/**
 * @author Team Chrocorg: Christian Werner, Yoco Harrmann, Georg Frey
 */

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  constructor() { }

  sendMessage(message: any[]) {
    this.subject.next({ message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
