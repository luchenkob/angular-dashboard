import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BillingService } from 'app/services/billing.service';

@Component({
    selector: 'main-my-stripe',
    templateUrl: './my-stripe.component.html',
    styleUrls: ['./my-stripe.component.scss'],
})
export class MyStripeComponent implements OnInit {
    cardCaptureReady = false;
    invalidError: any;
    cardDetailsFilledOut: any;
    extraData: any;

    /** Data card */
    @Output() dataCard = new EventEmitter<stripe.paymentMethod.PaymentMethod>();


    /** information about card */
   // detailInfoCard: stripe.paymentMethod.PaymentMethod;
    detailInfoCard: any;


    constructor(public billingService: BillingService) {}

    ngOnInit(): void {

    }

    onStripeInvalid(error: Error): void {
        console.log('Validation Error', error);
    }

    onStripeError(error: Error): void {
        console.error('Stripe error', error);
    }

    setPaymentMethod(token: stripe.paymentMethod.PaymentMethod): void {
        this.detailInfoCard = this.dataCard.emit(token);

        console.log('Stripe Payment Method', token);
    }

    setStripeToken(token: stripe.Token): void {
        console.log('Stripe Token', token);
    }

    setStripeSource(source: stripe.Source): void {
        console.log('Stripe Source', source);
    }
}
