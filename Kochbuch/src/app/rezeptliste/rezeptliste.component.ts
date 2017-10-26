import {Component, Input, OnInit} from '@angular/core';
import {RezeptListItem} from "./RezeptListItem";
import {Recipe} from '../alle-rezepte/alle-rezepte.service';

/**
 * @author Patrick Hahn
 * @author Armin Beck
 */

@Component({
  selector: 'app-rezeptliste',
  templateUrl: './rezeptliste.component.html',
  styleUrls: ['./rezeptliste.component.css']
})
export class RezeptlisteComponent implements OnInit {
  @Input() rezepte: Recipe[];
  constructor() {
  }

  ngOnInit() {
  }
}
