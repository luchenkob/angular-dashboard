import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { StripeModule } from 'stripe-angular';

import { SharedModule } from 'app/shared/shared.module';
import { PricingBillingComponent } from './pricing-billing.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';
import { BillingUsageComponent } from './billing-usage/billing-usage.component';
import { MyStripeComponent } from './my-stripe/my-stripe.component';
import { UpgradePlanComponent } from './uprage-plans/upgrade-plan.component';
import { FaqService } from 'app/main/pages/faq/faq.service';
import { ListFaqModule } from 'app/shared/componets/list-faq.module';


const routes: Routes = [
    {
        path: 'billing',
        component: PricingBillingComponent,
        children: [
            { path: 'plans', component: PricingPlansComponent },
            { path: 'usage', component: BillingUsageComponent },
            { path: 'upgrade/:id', component: UpgradePlanComponent }
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule,
        ReactiveFormsModule,

        FontAwesomeModule,
        NgCircleProgressModule,

        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatProgressSpinnerModule,

        StripeModule,
        MatRadioModule,
        ListFaqModule,
    ],
    declarations: [
        PricingBillingComponent,
        PricingPlansComponent,
        BillingUsageComponent,
        MyStripeComponent,
        UpgradePlanComponent
    ],
    providers: [
        FaqService
    ]
})
export class PricingBillingModule {
}
