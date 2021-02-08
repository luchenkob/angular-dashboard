import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListFaqComponent } from './list-faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule
    ],
    declarations: [
        ListFaqComponent
    ],
    exports: [
        ListFaqComponent
    ]
})

export class ListFaqModule {
}