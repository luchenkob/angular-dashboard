import { Component, OnInit } from '@angular/core';
import { BillingService } from 'app/services/billing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'main-pricing-plans',
    templateUrl: './pricing-plans.component.html',
    styleUrls: ['./pricing-plans.component.scss'],
})
export class PricingPlansComponent implements OnInit {

    constructor(public billingService: BillingService, private router: Router) {}

    ngOnInit(): void {}

    select(): void {}

    isInt(x: number): boolean {
        return x === Math.floor(x);
    }

    /**
     * Navigation to upgrade plan
     */
    navigateToUpgradePlan(id: number): void {
        this.router.navigateByUrl(`/home/billing/upgrade/${id}`);
    }

}
