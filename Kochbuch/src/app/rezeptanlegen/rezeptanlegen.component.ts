import {Component} from '@angular/core';
import {IngredientSearchService, RezeptanlegenService, TagSearchService} from "./rezeptanlegen.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeValidators} from "./rezeptanlegen.validator";
import {Observable} from "rxjs/Observable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddingredientmodalComponent} from "../ingredient/addingredientmodal/addingredientmodal.component";
import {IngredientService} from "../ingredient/ingredient.service";
import {Router} from "@angular/router";

/**
 * @author Thomas Hörner
 */
@Component({
  selector: 'app-rezeptanlegen',
  templateUrl: './rezeptanlegen.component.html',
  styleUrls: ['./rezeptanlegen.component.css'],
  providers: [TagSearchService, IngredientSearchService, RezeptanlegenService]
})
export class RezeptanlegenComponent {

  recipeForm: FormGroup;
  recipeFormTagArray: FormArray;
  recipeFormPrepStepsArray: FormArray;
  recipeFormIngredientsArray: FormArray;
  recipeFormPictureArray: FormArray;

  tempIngredientSearch: string;
  tempTagSearch: string;


  constructor(private _tss: TagSearchService,
              private _iss: IngredientSearchService,
              private modalService: NgbModal,
              private _fb: FormBuilder,
              private _is: IngredientService,
              private _rss: RezeptanlegenService,
              private router: Router) {

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
      tags: _fb.array([],
        RecipeValidators.minLengthArray(1)
      ),
      ingredients: _fb.array([], RecipeValidators.minLengthArray(1)),
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
      pics:
        _fb.array([], RecipeValidators.minLengthArray(1))
    });

    this.recipeFormTagArray = <FormArray> this.recipeForm.controls['tags'];
    this.recipeFormPrepStepsArray = <FormArray> this.recipeForm.controls['prepSteps'];
    this.recipeFormIngredientsArray = <FormArray> this.recipeForm.controls['ingredients'];
    this.recipeFormPictureArray = <FormArray> this.recipeForm.controls['pics'];

    this.tempIngredientSearch = '';
    this.tempIngredientSearch = '';

  }

  private submitting: boolean   = false;

  createRecipe() {
    if (this.recipeForm.valid) {
      this.submitting = true;
      let result = this._rss.create(Object.assign({}, this.recipeForm.value));
      result.then(value => {
        this.submitting = false;
        this.router.navigate(['/']);
      }).catch(reason => {
        this.submitting = false;
        alert("interner Fehler aufgetreten");
      })
    }
  }

  /*
   * Tags
   */

  private needNewTag: boolean = false;

  removeTag(indexToRemove: number) {
    this.recipeFormTagArray.removeAt(indexToRemove);
  }

  searchTag = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
          if (term.length < 2) {
            return [];
          } else {
            let temp = this._tss.search(term)
            temp.then(value => {
              if (value.length == 0) {
                this.needNewTag = true;
              } else {
                this.needNewTag = false;
              }
              return value;
            });
            return temp;
          }
        }
      )
      .catch(() => {
        this.needNewTag = true;
        return Observable.of([]);
      });

  formatterTag = (x: { name: string }) => x.name;

  tagSelected($event) {
    $event.preventDefault();
    this.tempTagSearch = "";
    this.recipeFormTagArray.push(
      this._fb.group({
        id: new FormControl($event.item.id,
          [
            Validators.required
          ]),
        name: new FormControl($event.item.name,
          [
            Validators.required
          ])
      }));
  }

  createNewTag() {
    if (this.tempTagSearch != null && this.tempTagSearch.length >= 3 && this.tempTagSearch.length <= 25) {
      this.recipeFormTagArray.push(
        this._fb.group({
          id: new FormControl(-1,
            [
              Validators.required
            ]),
          name: new FormControl(this.tempTagSearch,
            [
              Validators.required
            ])
        })
      );
      this.tempTagSearch = '';
    }
  }

  /*
   * Ingredients
   */

  private needNewIngredient: boolean = false;

  removeIngredient(indexToRemove: number) {
    this.recipeFormIngredientsArray.removeAt(indexToRemove);
  }

  searchIngredient = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
          if (term.length < 2) {
            return [];
          } else {
            let temp = this._iss.search(term)
            temp.then(value => {
              if (value.length == 0) {
                this.needNewIngredient = true;
              } else {
                this.needNewIngredient = false;
              }
              return value;
            });
            return temp;
          }
        }
      )
      .catch(() => {
        this.needNewIngredient = true;
        return Observable.of([]);
      });

  formatterIngredient = (x: { ingredientName: string }) => x.ingredientName;

  ingredientSelected($event) {
    $event.preventDefault();
    this.tempIngredientSearch = "";
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

  createNewIngredient(i) {
    i.blur();
    let modalRef = this.modalService.open(AddingredientmodalComponent);
    modalRef.componentInstance.preselectedIngredientName = this.tempIngredientSearch.trim();
    let tempSubs = this._is.getCreatedIngredients().subscribe(msg => {
      //set and close
      this.recipeFormIngredientsArray.push(
        this._fb.group({
          ingredientId: new FormControl(msg.ingredientId,
            [
              Validators.required
            ]),
          unitId: new FormControl(msg.unitId,
            [
              Validators.required
            ]),
          ingredientName: new FormControl(msg.ingredientName,
            [
              Validators.required
            ]
          ),
          amount: new FormControl('',
            [
              Validators.required,
              RecipeValidators.minMaxValidator(1, 10000)
            ])
        })
      );
      tempSubs.unsubscribe();
    });
    this.tempIngredientSearch = '';
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


  /*
   * Pics
   */

  onFilesChangePics(fileList: Array<File>) {
    fileList.forEach(file => {
      if (file.type.match("image/*")) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          let result: string = event.target.result;
          this.recipeFormPictureArray.push(this._fb.group({
            picData: result.split(",").pop(),
            picType: result.split(":").pop().split(";").shift()
          }));
          this.recipeFormPictureArray.markAsTouched();
        }
        reader.readAsDataURL(file);
      }
    });
  }

  removePicture(indexToRemove: number) {
    this.recipeFormPictureArray.removeAt(indexToRemove);
    //trigger validation
    this.recipeFormPictureArray.markAsTouched();
  }

}
