import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

// @ts-ignore
@Directive({
  selector: '[appMdpMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: mdpMatchValidatorDirective, multi: true }]
})

// tslint:disable-next-line:class-name
export class mdpMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return mdpMatchValidator(control);
  }
}

export const mdpMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors |
  null => {
  const mdp1 = control.get('mdp1');
  const mdp2 = control.get('mdp2');

  return mdp2.value !== mdp1.value ? { ['mdpDoNotMatch']: true } : null;
};

