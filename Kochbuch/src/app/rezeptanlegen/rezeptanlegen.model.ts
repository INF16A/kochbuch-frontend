/**
 *  @author Thomas Hörner
 */
export class Recipe {
  public name: string;
  public description: string;
  public difficulty: number;
  public persons: number;
  public tags: Tag[];
  public ingredients: IngredientLight[];
  public prepSteps: PreperationStep[];
  public pics: Pic[];

  constructor() {
    this.ingredients = [];
    this.tags = [];
    this.prepSteps = [];
    this.pics = [];
  }

}

export class Tag {
  public id: number = -1;
  public name: string;
}

export class IngredientLight {
  public ingredientId: number; //ist die ID von der tatsächlichen Zutat
  public ingredientName: string;
  public amount: number;
  public unitId: number; //ID der Einheit
}

export class PreperationStep {
  public effort: number;
  public stepNumber: number;
  public instruction: string;
}

export class Pic {
  public picData: String;
  public picType: String;
}
