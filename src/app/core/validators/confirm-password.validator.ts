import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let repeatPassword = control.get('repeatPassword').value;
    if (password != repeatPassword) {
      control.get('repeatPassword').setErrors({ RepeatPassword: true });
    }
    else {
      return null;
    }
  }
}