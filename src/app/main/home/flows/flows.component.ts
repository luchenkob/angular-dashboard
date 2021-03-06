import { Component, OnInit } from '@angular/core';

import { FlowsService } from 'app/services/flows.service';

import { MatDialog } from '@angular/material/dialog';
import { RenameComponent } from './rename/rename.component';
import { DetailsComponent } from './details/details.component';

import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { ConfirmComponent } from 'app/main/components/confirm/confirm.component';

export enum FlowAction {
    INFO,
    EDIT,
    RENAME,
    CLONE,
    DELETE,
}

@UntilDestroy()
@Component({
    selector: 'app-flows',
    templateUrl: './flows.component.html',
    styleUrls: ['./flows.component.scss'],
})
export class FlowsComponent implements OnInit {
    flows: IFlow[];

    constructor(private flowsService: FlowsService, private dialog: MatDialog, private router: Router) {}

    ngOnInit(): void {
        this.flowsService.flows$.pipe(untilDestroyed(this)).subscribe((flows) => {
            this.flows = flows;
        });

        this.flowsService.fetchFlows(); // fetch from the server
    }

    onFlowAction(flow: IFlow, action: FlowAction): void {
        switch (action) {
            case FlowAction.INFO: {
                this.dialog.open(DetailsComponent, {
                    data: flow,
                });
                break;
            }
            case FlowAction.EDIT: {
                this.router.navigate(['/editor', flow._id]);
                break;
            }
            case FlowAction.RENAME: {
                this.dialog.open(RenameComponent, {
                    width: '250px',
                    data: flow,
                });
                break;
            }
            case FlowAction.CLONE: {
                const newFlow: IFlow = JSON.parse(JSON.stringify(flow));
                delete newFlow._id;
                newFlow.title = `${newFlow.title} (clone)`;

                this.flowsService.createFlow(newFlow);
                break;
            }
            case FlowAction.DELETE: {
                this.dialog
                    .open(ConfirmComponent, {
                        width: '300px',
                        data: { title: 'Delete Confirmation', description: 'Do you want to delete this strategy?', strOk: 'OK', strCancel: 'Cancel' },
                    })
                    .afterClosed()
                    .subscribe((result) => {
                        if (result) this.flowsService.deleteFlow(flow._id);
                    });

                break;
            }
        }
    }
}
