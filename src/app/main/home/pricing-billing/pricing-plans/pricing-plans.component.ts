import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FaqService } from 'app/main/pages/faq/faq.service';
import { IFaqsList } from 'app/main/pages/faq/IFaqsList';
import { BillingService } from 'app/services/billing.service';

@Component({
    selector: 'main-pricing-plans',
    templateUrl: './pricing-plans.component.html',
    styleUrls: ['./pricing-plans.component.scss'],
})
export class PricingPlansComponent implements OnInit {

    unsubscribe: Subject<void> = new Subject<void>();

    /** current plan id */
    currentPlan = 'free';
    /** list prising faq */
    listFaqs: IFaqsList[];

    constructor(
        public billingService: BillingService,
        private router: Router,
        private faqService: FaqService
    ) {}

    ngOnInit(): void {
        this.initialListFaqs();
    }

    select(): void {}

    isInt(x: number): boolean {
        return x === Math.floor(x);
    }

    /**
     * Navigation to upgrade plan
     */
    navigateToUpgradePlan(id: string): void {
        this.router.navigateByUrl(`/home/billing/upgrade/${id}`);
    }

    /** get list faq for page pricing plan */
    initialListFaqs(): void {
        this.faqService.fetchFaqForPricing().pipe(
            takeUntil(this.unsubscribe)).subscribe((pricingFaqs: IFaqsList[]) => {
            this.listFaqs = pricingFaqs;
        });
    }
}
