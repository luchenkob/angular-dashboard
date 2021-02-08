import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { FaqService } from 'app/main/pages/faq/faq.service';
import { FaqComponent } from 'app/main/pages/faq/faq.component';
import { ListFaqModule } from 'app/shared/componets/list-faq.module';

const routes = [
    {
        path: 'faq',
        component: FaqComponent,
        resolve: {
            faq: FaqService
        }
    }
];

@NgModule({
    declarations: [
        FaqComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatExpansionModule,
        MatIconModule,
        FuseSharedModule,
        ListFaqModule
    ],
    providers: [
        FaqService
    ]
})
export class FaqModule {

}
