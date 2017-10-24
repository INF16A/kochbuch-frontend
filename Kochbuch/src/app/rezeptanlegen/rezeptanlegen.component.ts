/*
 Authors:
 Thomas Hörner
 Patrick Eichert
 Florian Eder
 Enrico Greßer
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./rezept.classes";
import {Form, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isUndefined} from "util";

@Component({
  selector: 'app-rezeptanlegen',
  templateUrl: './rezeptanlegen.component.html',
  styleUrls: ['./rezeptanlegen.component.css']
})
export class RezeptanlegenComponent implements OnInit, OnDestroy {

  /**
   * main form
   */
  public createRecipe: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.createRecipe = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        difficulty: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
        personCount: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
        description: ['', [Validators.required]],
        tags: this._fb.array([
          this.initTag('tests')
        ])
      }
    )
  }

  ngOnDestroy() {

  }

  initTag(name: String) {
    return this._fb.group({
      name: [name, [Validators.required]]
    })
  }

  addTag(name: String) {
    if (name != null && name.length != 0) {
      let t = <FormArray> this.createRecipe.controls['tags'];
      t.push(this.initTag(name));
    }
  }

  removeTag(i: number) {
    let temp = <FormArray> this.createRecipe.controls['tags'];
    temp.removeAt(i);
  }

  save(model: Recipe) {
    console.log("save");
  }
}
