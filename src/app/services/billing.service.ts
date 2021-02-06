import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BillingService {

    billingMethods = [
        { svg: 'assets/billing/american-express.svg', title: '' },
        { svg: 'assets/billing/diners-club.svg', title: '' },
        { svg: 'assets/billing/discover.svg', title: '' },
        { svg: 'assets/billing/jcb.svg', title: '' },
        { svg: 'assets/billing/mastercard.svg', title: '' },
        { svg: 'assets/billing/visa.svg', title: '' },
    ];

    pricingPlans: IPricingPlan[] = [
        {
            id: 1,
            title: 'free',
            subtitle: 'Anyone can automate their work. Start with the basics.',
            optionId: 0,
            options: [{ price: 0, priceMonthly: 0, tasksPerMonth: 100 }],
            limitZaps: 5,
            limitUpdateTime: 15,
            features: ['Single-step Zaps'],
        },
        {
            id: 2,
            title: 'starter',
            subtitle: 'Unleash the power of automation.',
            optionId: 0,
            options: [
                { price: 12, priceMonthly: 15, tasksPerMonth: 750 },
                { price: 39, priceMonthly: 48.75, tasksPerMonth: 1500 },
            ],
            limitZaps: 5,
            limitUpdateTime: 15,
            features: ['Multi-step Zaps', '3 Premium Apps', 'Filters', 'Formatters', 'Connections Via Webhooks'],
        },
        {
            id: 3,
            title: 'professional',
            subtitle: 'Advanced tools to take your work to the next level.',
            optionId: 0,
            options: [
                { price: 52, priceMonthly: 65, tasksPerMonth: 2000 },
                { price: 89, priceMonthly: 111.25, tasksPerMonth: 5000 },
                { price: 89, priceMonthly: 111.25, tasksPerMonth: 5000 },
                { price: 89, priceMonthly: 111.25, tasksPerMonth: 5000 },
            ],
            limitZaps: 5,
            limitUpdateTime: 15,
            features: [
                'Multi-step Zaps',
                'Unlimited Premium Apps',
                'Filters',
                'Formatters',
                'Connections Via Webhooks',
                'Custom Logic - Paths',
                'Auto Replay',
            ],
        },
        {
            id: 4,
            title: 'team',
            subtitle: 'Bring your team together to collaborate on automation.',
            optionId: 0,
            options: [
                { price: 79.20, priceMonthly: 99, tasksPerMonth: 50000 },
                { price: 299, priceMonthly: 373.75, tasksPerMonth: 50000 },
                { price: 299, priceMonthly: 373.75, tasksPerMonth: 50000 },
                { price: 299, priceMonthly: 373.75, tasksPerMonth: 50000 },
            ],
            limitZaps: 5,
            limitUpdateTime: 15,
            features: [
                'Multi-step Zaps',
                'Unlimited Premium Apps',
                'Filters',
                'Formatters',
                'Connections Via Webhooks',
                'Custom Logic - Paths',
                'Auto Replay',
                'Unlimited Users',
                'Folder Permissions',
                'Premier Support',
                'Shared App Connections',
                'Shared Workspace',
            ],
        },
        {
            id: 5,
            title: 'company',
            subtitle: 'Automation plus enterprise-grade features.',
            optionId: 0,
            options: [
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
                { price: 599, priceMonthly: 748.75, tasksPerMonth: 100000 },
            ],
            limitZaps: 5,
            limitUpdateTime: 15,
            features: [
                'Multi-step Zaps',
                'Unlimited Premium Apps',
                'Filters',
                'Formatters',
                'Connections Via Webhooks',
                'Custom Logic - Paths',
                'Auto Replay',
                'Unlimited Users',
                'Folder Permissions',
                'Premier Support',
                'Shared App Connections',
                'Shared Workspace',
                'Advanced Admin Permissions',
                'User Provisioning (SCIM)',
                'Apps Restrictions',
                'SAML Single Sign On (SSO)',
                'Custom Data Retention',
                'Account Consolidation',
                'Live Training With Customer Success',
            ],
        },
    ];
    constructor() {}
}

export interface IPricingPlan {
    id: number;
    title: string;
    subtitle: string;
    optionId: number;
    options: IPricingOption[];
    limitZaps: number | 'Unlimited';
    limitUpdateTime: number;
    features: string[];
}

export interface IPricingOption {
    price: number;
    priceMonthly: number;
    tasksPerMonth: number;
}
