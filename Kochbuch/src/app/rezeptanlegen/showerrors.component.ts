import {Component, Input, Optional} from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm} from "@angular/forms";

/**
 * @author Thomas Hörner
 */
@Component({
  selector: 'show-errors',
  template: `
    <small *ngIf="errorMessages" class="text-danger">
      <div *ngFor="let errorMessage of errorMessages">
        {{errorMessage}}
      </div>
    </small>`
})
export class ShowerrorsComponent {

  @Input('path') path;
  @Input('text') displayName = '';

  constructor(@Optional() private ngForm: NgForm,
              @Optional() private formGroup: FormGroupDirective) {
  }

  get errorMessages(): string[] {
    let form: FormGroup;
    if (this.ngForm) {
      form = this.ngForm.form;
    } else {
      form = this.formGroup.form;
    }
    let control = form.get(this.path);
    let messages = [];
    if (!control || control.pristine || control.untouched || !control.errors) {
      return null;
    }
    for (let code in control.errors) {
      if (control.errors.hasOwnProperty(code)) {
        let error = control.errors[code];
        let message = '';
        switch (code) {
          case 'required':
            message = `${this.displayName} ist ein Pflichtfeld`;
            break;
          case 'minlength':
            message = `${this.displayName} muss mindestens ${error.requiredLength} Zeichen enthalten`;
            break;
          case 'maxlength':
            message = `${this.displayName} darf maximal ${error.requiredLength} Zeichen enthalten`;
            break;
          case 'NaN':
            message = `${this.displayName} muss eine Zahl sein!`;
            break;
          case 'minmax':
            message = `${this.displayName} muss größer als ${error.minval} und kleiner als ${error.maxval} sein`;
            break;
          case 'min':
            message = `${this.displayName} muss größer als ${error.min} sein`;
            break;
          case 'max':
            message = `${this.displayName} muss kleiner als ${error.max} sein`;
            break;
          case 'negativ':
            message = `${this.displayName} darf nicht negativ sein!`;
            break;
          default:
            message = `${this.displayName} ist nicht valide`;
        }
        messages.push(message);
      }
    }
    return messages;
  }

}
