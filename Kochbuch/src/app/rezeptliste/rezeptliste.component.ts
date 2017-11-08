import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RezeptListItem} from "./RezeptListItem";
import {Recipe} from '../RezepteService/rezepte-service';
import {MessageService} from "../_services/message.service";
import {SubscribableOrPromise} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Yoco Harrmann, Christian Werner, Georg Frey
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
        return this.rezepte;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // MemoryLeaks vorbeugen
  }
}
