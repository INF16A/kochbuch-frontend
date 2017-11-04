/**
 *  @author Thomas Hörner
 */
export class Recipe {
  public name: string;
  public description: string;
  public difficulty: number;
  public persons: number;
  public tags: Tag[];
  public ingredients: Ingredient[];
  public prepSteps: PreperationStep[];

  constructor() {
    this.ingredients = new Array();
    this.tags = new Array();
    this.prepSteps = new Array();
  }

}

export class Tag {
  public id: number = -1;
  public name: string;
}

/**
 * @author Thomas Hörner
 */
export class Ingredient {
  public ingredientId: number; //ist die ID von der tatsächlichen Zutat
  public ingredientName: string;
  public amount: number;
  public unitId: number; //ID der Einheit
  public unitName: string;
}

/**
 * @author Thomas Hörner
 */
export class PreperationStep {
  public effort: number;
  public stepNumber: number;
  public instruction: string;
}
