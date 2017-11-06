import {AbstractControl, ValidatorFn} from "@angular/forms";
import {isNumber} from "util";


export class RecipeValidators {

  /**
   * Validation für ein Formarray, um die mindestlänge zu validieren
   * @param min
   * @returns {(c:AbstractControl)=>{[p: string]: any}}
   */
  static minLengthArray(min: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min)
        return null;

      return {'minLengthArray': {valid: false}};
    }
  }

  /**
   * MinMaxNaN - Validator
   * @param {number} min
   * @param {number} max
   * @returns {ValidatorFn}
   */
  static minMaxValidator(min: number, max: number): ValidatorFn {
    let _min = min;
    let _max = max;
    return (c: AbstractControl): { [key: string]: any } => {
      if (!isNumber(c.value))
        return {'NaN': {valid: false}};
      if (c.value >= min && c.value <= max)
        return null;
      return {'minmax': {valid: false, minval: _min, maxval: _max}};
    }
  }

}
