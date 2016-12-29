import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class ValidationService {

    constructor() {
    }

    public emailValidation(control: FormControl): {[key: string]: boolean} {
        const value = control.value || '';
        const valid = value.match(/@/);
        return valid ? null : {email: true};
    }
}
