export interface IStripeDetail {
    billing_details: {
        address: {
            city: number | null;
            country: number | null;
            line1: string | null;
            line2: string | null;
            postal_code: string | null;
            state: string | null;
        }
        email: string | null;
        name: string | null;
    };
    card: {
        brand: string;
        checks: {
            address_line1_check: string | null;
            address_postal_code_check: string | null;
            cvc_check: string | null;
        };
        country: string;
        exp_month: number;
        exp_year: number;
        funding: string;
        generated_from: string | null;
        last4: string;
        networks: {
            available: string[];
        },
        preferred: string | null;
        three_d_secure_usage: {
            supported: boolean;
        }
        wallet: string | null;
    };
    created: number;
    customer: number | null;
    id: string;
    livemode: boolean;
    object: string;
    type: string;
    detailPlan: {
        planTitle: string;
        priceId: string;
        sumPrice: number;

    }
}
