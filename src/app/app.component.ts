import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'app works!';

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
    public constructor() {}
}
