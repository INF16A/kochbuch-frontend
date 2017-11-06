import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RezeptListItem} from "./RezeptListItem";
import {Recipe} from '../alle-rezepte/alle-rezepte.service';
import {MessageService} from "../_services/message.service";
import {SubscribableOrPromise} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Yoco Harrmann
 */

@Component({
  selector: 'app-rezeptliste',
  templateUrl: './rezeptliste.component.html',
  styleUrls: ['./rezeptliste.component.css']
})
export class RezeptlisteComponent implements OnInit, OnDestroy {
  message: any;
  subscription: Subscription;


  @Input() rezepte: Recipe[];

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        this.rezepte = message;
        console.log(message);
        console.log(this.rezepte);
        return
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe(); // MemoryLeaks vorbeugen
  }
}
