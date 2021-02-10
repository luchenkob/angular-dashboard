import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFlowStep } from 'app/shared/interfaces/IFlow';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowService } from 'app/services/flow.service';
import { FlowsService } from 'app/services/flows.service';

@Component({
    selector: 'editor-detail-panel',
    templateUrl: './detail-panel.component.html',
    styleUrls: ['./detail-panel.component.scss'],
})
export class DetailPanelComponent implements OnInit, OnChanges {
    @Input() step: IFlowStep;
    @Input() editable: boolean;

    signalTypes: any[];
    signalType: any;
    form?: FormGroup;
    options: any;

    constructor(private fb: FormBuilder, private snackbar: MatSnackBar, public flowService: FlowService, public flowsService: FlowsService) {}

    ngOnInit(): void {
        this.flowsService.allSignals$.subscribe(res => this.signalTypes = res);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.step) {
            const step = changes.step.currentValue;
            this.flowsService.allSignals$.subscribe(res => {
                this.signalTypes = res;
                const signalType = this.signalTypes.find(type => type.id === step.signalType);
                if (step.type === 'signal') {
                    this.options = step.signalOptions;
                }

                this.form = this.fb.group({
                    type: step.type,
                    ...(step.type === 'signal' && step.signalType === 'wait_seconds' ? {} : { ticker: [step.ticker], }),
                    ...(step.type === 'signal'
                        ? { signalType, signalOptions: this.options }
                        : {
                            amount: [step.amount, [Validators.required, Validators.pattern(/\d{1,}/), Validators.min(1), Validators.max(9999)]],
                        }),
                });
            });
            
        }

        if (this.editable) this.form.enable();
        else this.form.disable();
    }

    close(): void {
        this.flowService.activeStep = null;
    }

    delete(): void {
        this.flowService.deleteStep(this.step._id);
        this.close();
    }

    save(): void {
        if (this.form.invalid) {
            this.snackbar.open('Invalid form data', 'close', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
                panelClass: ['red-snackbar'],
            });
            return;
        }

        const cloneForm = {...this.form.value};
        const signalType = this.form.value['signalType'];

        if (this.options) {
            cloneForm['signalOptions'] = this.options;
        }
        if (signalType && signalType.id) {
            cloneForm['signalType'] = signalType.id;
        }

        this.flowService.updateStep(this.step._id, cloneForm);
    }

    optionChanged(type: string, evt: Event | any): void {
        this.options = this.options ? this.options : {};
        this.options[type] = evt.value ? evt.value : evt.target.value;
    }

    typeChanged(evt): void {
        this.options = {};
        evt.value.fields.forEach(field => {
            this.options[field.key] = null;
        });
    }
}
