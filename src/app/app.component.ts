import {Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = '';
    public signUpForm: FormGroup;
    public loginForm: FormGroup;

    public constructor(private _formBuilder: FormBuilder) {
        this.signUpForm = new FormGroup({
            fname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            lname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            email: new FormControl('', this.emailValidation),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]))
        });
        this.loginForm = this._formBuilder.group({
            email: ['', this.emailValidation],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(3)])]
        });
    }
    public changeTab(ev: Event) {
        let link = ev.target as HTMLElement,
            sibling = link.parentElement.nextElementSibling || link.parentElement.previousElementSibling as HTMLElement,
            queryAttr: string = link.getAttribute('href'),
            tab = document.querySelector(`.tab-content > div:not(${queryAttr})`) as HTMLElement,
            formWrapper = document.querySelector(`${queryAttr}`) as HTMLElement;
        link.parentElement.classList.add('active');
        sibling.classList.remove('active');
        tab.style.display = 'none';
        formWrapper.style.display = 'block';
    };
    public inputData(e: Event) {
        let currentInput  = e.target as HTMLInputElement,
            label = currentInput.previousElementSibling as HTMLElement;

        if (e.type === 'keyup') {
            if (currentInput.value === '') {
                label.classList.remove('active', 'highlight');
            } else {
                label.classList.add('active', 'highlight');
            }
        } else if (e.type === 'blur') {
            if (currentInput.value === '' ) {
                label.classList.remove('active', 'highlight');
            } else {
                label.classList.remove('highlight');
            }
        } else if (e.type === 'focus') {
            if (currentInput.value === '' ) {
                label.classList.remove('highlight');
            } else if (currentInput.value !== '' ) {
                label.classList.remove('highlight');
            }
        }
    }
    public emailValidation(control: FormControl): {[key: string]: boolean} {
        const value = control.value || '';
        const valid = value.match(/@/);
        return valid ? null : {email: true};
    }
    public submit(ev: Event, value: {[key: string]: string}) {
        let form = ev.target as HTMLFormElement;
        if (form.classList.contains('ng-invalid')) {
            alert('wrong data');
        } else {
            console.log(value);
            form.reset();
        }
    }
}
