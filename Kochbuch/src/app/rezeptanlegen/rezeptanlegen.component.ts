import {Component} from '@angular/core';
import {Ingredient, Recipe} from "./rezeptanlegen.model";
import {IngredientSearchService, TagSearchService} from "./rezeptanlegen.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeValidators} from "./rezeptanlegen.validator";
import {Observable} from "rxjs/Observable";

/**
 * @author Thomas Hörner
 */
@Component({
  selector: 'app-rezeptanlegen',
  templateUrl: './rezeptanlegen.component.html',
  styleUrls: ['./rezeptanlegen.component.css'],
  providers: [TagSearchService, IngredientSearchService]
})
export class RezeptanlegenComponent {

  recipeModel: Recipe = new Recipe();
  recipeForm: FormGroup;
  recipeFormTagArray: FormArray;
  recipeFormPrepStepsArray: FormArray;
  recipeFormIngredientsArray: FormArray;

  submitted = false;

  constructor(private _tss: TagSearchService, private _iss: IngredientSearchService, private _fb: FormBuilder) {
    this.recipeForm = _fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      description: ['',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250)
        ]
      ],
      difficulty: ['',
        [
          Validators.required,
          RecipeValidators.minMaxValidator(1, 5)
        ]
      ],
      persons: ['',
        [
          Validators.required,
          RecipeValidators.minMaxValidator(1, 1000)
        ]
      ],
      tags: _fb.array([
          _fb.group({
            name: new FormControl('',
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15)
              ])
          })],
        RecipeValidators.minLengthArray(1)
      ),
      ingredients: _fb.array([
        // this._fb.group({
        //   ingredientId: new FormControl(''),
        //   unitId: new FormControl(''),
        //   unitName: new FormControl(''),
        //
        //   ingredientName: new FormControl('', [
        //     Validators.required
        //   ]),
        //   amount: new FormControl('', [
        //     Validators.required,
        //     RecipeValidators.minMaxValidator(1, 10000)
        //   ])
        // })
      ]),
      prepSteps: _fb.array([
          _fb.group({
            effort: new FormControl('',
              [
                Validators.required,
                RecipeValidators.minMaxValidator(0, 500)
              ]),
            instruction: new FormControl('',
              [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(250)
              ])
          })],
        RecipeValidators.minLengthArray(1)
      ),
    });

    this.recipeFormTagArray = <FormArray> this.recipeForm.controls['tags'];
    this.recipeFormPrepStepsArray = <FormArray> this.recipeForm.controls['prepSteps'];
    this.recipeFormIngredientsArray = <FormArray> this.recipeForm.controls['ingredients'];
  }

  createRecipe() {
    this.submitted = true;
    console.log("creating recipe");
    this.submitted = false;
  }

  /*
   * Tags
   */

  addTag() {
    this.recipeFormTagArray.push(this.createTagControl());
  }

  removeTag(indexToRemove: number) {
    this.recipeFormTagArray.removeAt(indexToRemove);
  }

  private createTagControl(): FormGroup {
    return new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ])
    })
  }

  searchTag = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 ? [] :
        this._tss.search(term)
          .then(value => {
            let rtn: string[] = [];
            value.forEach(value2 => {
              return rtn.push(value2.name)
            });
            return rtn;
          })
          .catch(() => {
            return Observable.of([]);
          }));

  /*
   * Ingredients
   */

  removeIngredient(indexToRemove: number){
    this.recipeFormIngredientsArray.removeAt(indexToRemove);
  }

  searchIngredient = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 ? [] :
        this._iss.search(term)
      )
      .catch(() => {
        return Observable.of([]);
      });

  formatterIngredient = (x: { ingredientName: string }) => x.ingredientName;

  ingredientSelected($event) {
    $event.preventDefault();

    this.recipeFormIngredientsArray.push(
      this._fb.group({
        ingredientId: new FormControl($event.item.ingredientId,
          [
            Validators.required
          ]),
        unitId: new FormControl($event.item.unitId,
          [
            Validators.required
          ]),
        unitName: new FormControl($event.item.unitName,
          [
            Validators.required
          ]),
        ingredientName: new FormControl($event.item.ingredientName,
          [
            Validators.required
          ]
        ),
        amount: new FormControl('',
          [
            Validators.required,
            RecipeValidators.minMaxValidator(1, 10000)
          ])
      }));
  }

  /*
   * PrepSteps
   */

  addPrepStep() {
    this.recipeFormPrepStepsArray.push(this.createPrepControl());
  }

  removePrepStep(indexToRemove: number) {
    this.recipeFormPrepStepsArray.removeAt(indexToRemove);
  }

  private createPrepControl(): FormGroup {
    return new FormGroup({
      effort: new FormControl('',
        [
          Validators.required,
          RecipeValidators.minMaxValidator(0, 500)
        ]),
      instruction: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250)
        ])
    })
  }

}
