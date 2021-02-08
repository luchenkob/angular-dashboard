import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStripeDetail } from '../main/home/pricing-billing/types/IStripeDetail';

@Injectable({
    providedIn: 'root'
})

export class StripeService {
    constructor(private http: HttpClient) {
    }

    /**
     * send detail payments
     */
    sendDetailsPayments(detail): Observable<boolean> {
        return this.http.post<boolean>('url', detail);
    }
}
