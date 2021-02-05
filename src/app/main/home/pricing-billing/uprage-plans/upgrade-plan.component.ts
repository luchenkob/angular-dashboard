import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Subject } from 'rxjs';

import { BillingService, IPricingPlan } from 'app/services/billing.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'main-upgrade-plan',
    templateUrl: './upgrade-plan.component.html',
    styleUrls: ['./upgrade-plan.component.scss']
})
export class UpgradePlanComponent implements OnInit, OnDestroy {

    unsubscribe: Subject<void> = new Subject<void>();

    /** current plan */
    currentPlan: IPricingPlan;
    /** change selection option */
    chooseBlockPay =  false;
    /** user email */
    userEmail: string

    form: FormGroup;

    constructor(
        private billingService: BillingService,
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
       this.getCurrentPricingPlan();
       this.initialForm();

       this.userEmail = this.authService.user?.email;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Changes select method pay
     */
    changeChooseBlock(): void {
        this.chooseBlockPay = !this.chooseBlockPay;
    }

    /**
     *
     * Get choose plan
     *
     */
    private getCurrentPricingPlan(): void {
        const id = +this.activeRouter.snapshot.params['id'];

        this.currentPlan = this.billingService.pricingPlans.filter(
            (plans) => plans.id === id)[0];

    }

    /**
     * Initialize form
     *
     */
    private initialForm(): void {
        this.form = this.fb.group({
            options: ['1']
        })
    }

}
