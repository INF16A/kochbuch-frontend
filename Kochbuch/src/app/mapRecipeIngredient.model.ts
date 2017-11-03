/**
 * @author Daniel Abel
 * @author Patrick Eichert
 * @author Theresa Reus
 */


import { Ingredient } from 'app/ingredient/ingredient.model';
export class RecipeIngredient {
    amount: number;
    amountPerPerson: number;
    costPerUnit: number;
    linkedIngredientId: number;
    linkendRecipeId: number;
    ingredient: Ingredient;
  }
