import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';

import { BillingService, IPricingPlan } from 'app/services/billing.service';

@Component({
    selector: 'main-upgrade-plan',
    templateUrl: './upgrade-plan.component.html',
    styleUrls: ['./upgrade-plan.component.scss']
})
export class UpgradePlanComponent implements OnInit, OnDestroy {

    currentPlan: IPricingPlan;
    form: FormGroup;


    constructor(
        private billingService: BillingService,
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
       this.getCurrentPricingPlan();
       this.initialForm();
    }

    ngOnDestroy(): void {

    }

    private getCurrentPricingPlan(): void {
        const id = +this.activeRouter.snapshot.params['id'];

        this.currentPlan = this.billingService.pricingPlans.filter(
            (plans) => plans.id === id)[0];

    }

    private initialForm(): void {
        this.form = this.fb.group({
            options: ['1']
        })
    }

}
