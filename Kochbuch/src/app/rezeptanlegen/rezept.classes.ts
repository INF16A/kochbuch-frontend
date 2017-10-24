/**
 * @author Thomas Hörner
 */

export class Recipe {
  name: String;
  description: String;
  difficulty: Number;
  persons: Number;
  createDate: Date;
  tags :Tag[];
  steps: PreperationStep[];
  ingredients: RecipeIngredient[];
  //TODO pic
}

export class Tag {
  id: Number;
  name: String;
}

export class PreperationStep {
  id: Number;
  stepCount: Number;
  description: String;
  //TODO pic
}

export class RecipeIngredient {
  id: Number;
  name: String;
  amount: Number;
  unit: String;
}
