import {Directive, HostListener, Input} from "@angular/core";
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Directive({
  selector: 'input[trim], textarea[trim]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: InputTextareaTrimDirective, multi: true}
  ],

})
export class InputTextareaTrimDirective extends DefaultValueAccessor {

  @Input() trim: string;

  private set value(val: any) {
    this.writeValue(val);
    this.onChange(val);
  }

  @HostListener('blur', ['$event.type', '$event.target.value'])
  @HostListener('input', ['$event.type', '$event.target.value'])
  onInput(event: string, value: string): void {
    this.value = (this.trim !== '' && event !== this.trim) ? value : value.trim();
  }

}
