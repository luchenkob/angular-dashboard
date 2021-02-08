import { Component, Input } from '@angular/core';

import { IFaqsList } from 'app/main/pages/faq/IFaqsList';

@Component({
    selector: 'main-list-faq',
    templateUrl: './list-faq.component.html',
    styleUrls: ['./list-faq.component.scss']
})

export class ListFaqComponent {

    /** List question */
    @Input() listFaqs: IFaqsList[]

    /** current open question */
    currentOpenStep = 0;

    constructor() {
    }

    openQuestion(position: number): void {
        this.currentOpenStep = position;
    }
}
