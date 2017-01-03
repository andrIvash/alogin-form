import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from './shared/validation.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public title = '';
    public signUpForm: FormGroup;
    public loginForm: FormGroup;

    @ViewChild('tabGroup')
    public tabGroup: ElementRef;
    private tab: Observable<Event>;
    private currentTabState: string = '#signup';
    public constructor(private _formBuilder: FormBuilder, private _validationService: ValidationService) {}
    public ngOnInit() {
        this.tab = Observable.fromEvent<Event>(this.tabGroup.nativeElement, 'click');
        this.tab.subscribe((event: Event) => {
            this.currentTabState = (event.target as HTMLAnchorElement).hash;
            console.log(this.currentTabState);
        });
        this.signUpForm = new FormGroup({
            fname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            lname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
            email: new FormControl('', this._validationService.emailValidation),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]))
        });
        this.loginForm = this._formBuilder.group({
            email: ['', this._validationService.emailValidation],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(3)])]
        });
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
