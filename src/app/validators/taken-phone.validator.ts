import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Observable, map } from 'rxjs';

export class TakenPhoneValidator {
  static createValidator(backendService: BackendService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return backendService
        .isPhoneTaken('+52' + control.value)
        .pipe(
          map((result: boolean) => (result ? { isPhoneTaken: result } : null))
        );
    };
  }
}
