/**
 * @author Patrick Hahn
 * @author Armin Beck
 */
import { Pic } from '../pic.model';
import { User } from "app/user.model";
import { Recipe } from '../alle-rezepte/alle-rezepte.service';

export interface RezeptListItem extends Recipe {
  rating: { value: number }[],
  ratingSum: number,
  img: Pic,
}
