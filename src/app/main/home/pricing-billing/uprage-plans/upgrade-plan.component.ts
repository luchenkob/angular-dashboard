import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { BillingService, IPricingPlan } from 'app/services/billing.service';
import { AuthService } from 'app/auth/auth.service';
import { environment } from '../../../../../environments/environment';
import { StripeService } from '../../../../services/stripe.service';
import { takeUntil } from 'rxjs/operators';



@Component({
    selector: 'main-upgrade-plan',
    templateUrl: './upgrade-plan.component.html',
    styleUrls: ['./upgrade-plan.component.scss']
})
export class UpgradePlanComponent implements OnInit, OnDestroy {

    unsubscribe: Subject<void> = new Subject<void>();
    /** current select plan */
    currentPlan: IPricingPlan;
    /** change selection option */
    chooseBlockPay = false;
    /** user email */
    userEmail: string
    /** form  */
    form: FormGroup;
    /** info about card */
    detailCard: stripe.paymentMethod.PaymentMethod;
    /** payment handler */
    paymentHandler = null;

    constructor(
        private billingService: BillingService,
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private stripeService: StripeService
    ) {
    }

    ngOnInit(): void {
        this.getCurrentPricingPlan();
        this.initialForm();

        this.userEmail = this.authService.user?.email;

        /** remove after changes */
        this.paymentHandler = Stripe(environment.stripeKey);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }


    /** Get datail info about payment card  */
    getDataCard(token: stripe.paymentMethod.PaymentMethod): void {
        this.detailCard = token;
    }

    /**
     * remove after changes
     * Upgrade account
     */
    upgradeMyAccount(): void {
        if (this.detailCard) {

            const detailPlan = {
                planTitle: this.currentPlan.title,
                priceId: this.currentPlan.priceId,
                sumPrice: this.currentPlan.options[0][this.form.value.options]
            }

            const request = {...this.detailCard, detailPlan};


            this.stripeService.sendDetailsPayments(request).pipe(
                takeUntil(this.unsubscribe)).subscribe((result) => {

                    if (result) {
                        console.log('Success');
                    }
            });

        }
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
        const id = this.activeRouter.snapshot.params['id'];

        this.currentPlan = this.billingService.pricingPlans.filter(
            (plans) => plans.title === id)[0];

    }

    /**
     * Initialize form
     *
     */
    private initialForm(): void {
        this.form = this.fb.group({
            options: ['price']
        })
    }

}
