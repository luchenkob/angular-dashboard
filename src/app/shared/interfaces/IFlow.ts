export const SIGNAL_TYPES = ['price_below', 'price_above', 'wait_seconds'];

export type IFlowStepType = 'buy' | 'sell' | 'signal';

export type IFlowStatus = 'draft' | 'active' | 'stopped' | 'failed' | 'finished';

export type IFlowStepStatus = 'waiting' | 'failed' | 'executed';

export interface IFlowStep {
    _id?: any;
    ticker?: string;
    state?: IFlowStepStatus;
    type?: IFlowStepType;
    amount?: number;
    createdAt?: Date;
    executedAt?: Date;
    signalType?: 'price_below' | 'price_above' | 'wait_seconds';
    signalOptions?: ISignalOptions;
    order?: any;
    children?: IFlowStep[]; // only on the editor
}

export interface IFlow {
    _id?: string;
    title?: string;
    status?: IFlowStatus;
    steps?: IFlowStep[];
    log?: string[];
}

export interface ISignalOptions {
    interval?: string;
    time_period?: number;
    series_type?: string;
    compare?: string;
}
