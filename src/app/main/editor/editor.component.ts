import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FuseConfigService } from '@fuse/services/config.service';
import { FlowsService } from 'app/services/flows.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../home/flows/details/details.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowService } from 'app/services/flow.service';
import { Subscription } from 'rxjs';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

declare const EasyPZ;

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
    easypz;
    translateX = -7500;
    translateY = -7500;
    scale = 1;

    flow: IFlow;
    flowId: string;
    subsFlow: Subscription;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private flowsService: FlowsService,
        private location: Location,
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        public flowService: FlowService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
            if (!paramMap.has('flowId')) {
                const newFlow = await this.flowsService.createFlow({
                    title: 'New Strategy',
                    steps: [],
                    status: 'stopped',
                });

                this.router.navigate(['/editor', newFlow._id]);
                return;
            }

            const flowId = paramMap.get('flowId');
            this.flowService.loadFlow(flowId);
        });

        this.subsFlow = this.flowService.flow$.subscribe(({ flowId, flow }) => {
            this.flowId = flowId;
            this.flow = flow;
        });
    }

    ngAfterViewInit(): void {
        this.makeEasyPZ();
    }

    ngOnDestroy(): void {
        this.subsFlow.unsubscribe();
    }

    goBack(): void {
        this.location.back();
    }

    onClickPanContainer(event): void {
        if (event.target.id.slice(0, 3) === 'pan') {
            this.flowService.activeStep = null;
        }
    }

    initTransform(): void {
        if (this.flow && this.flow.steps.length > 2) {
            this.translateX = -7500;
            this.translateY = -7750;
            this.scale = 1;
        } else {
            this.translateX = -7500;
            this.translateY = -7500;
            this.scale = 1;
        }
    }

    transformString(scale, translateX, translateY): string {
        return `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
    }

    makeEasyPZ(): void {
        this.initTransform();
        if (this.easypz) {
            this.easypz.removeHostListeners();
        }

        const onTransform = (transform: { scale: number; translateX: number; translateY: number }) => {};

        const onPanned = (
            panData: { x: number; y: number },
            transform: {
                scale: number;
                translateX: number;
                translateY: number;
            }
        ) => {
            this.translateX += panData.x;
            this.translateY += panData.y;
        };

        const onZoomed = (
            zoomData: {
                x: number;
                y: number;
                scaleChange?: number;
                absoluteScaleChange?: number;
                targetX?: number;
                targetY?: number;
            },
            transform: {
                scale: number;
                translateX: number;
                translateY: number;
            }
        ) => {
            let scale = this.scale * zoomData.scaleChange;
            if (scale > 1.75) {
                scale = 1.75;
            }
            if (scale < 0.25) {
                scale = 0.25;
            }
            this.scale = scale;
        };

        const container: HTMLElement = document.querySelector('#pan-container');

        this.easypz = new EasyPZ(
            container,
            onTransform,
            {
                minScale: 0.25,
                maxScale: 1.75,
                bounds: {
                    top: -15000,
                    right: 15000,
                    bottom: 15000,
                    left: -15000,
                },
            },
            ['SIMPLE_PAN', 'WHEEL_ZOOM', 'PINCH_ZOOM'],
            { WHEEL_ZOOM: { zoomInScaleChange: 0.98, zoomOutScaleChange: 1.02 } },
            onPanned,
            onZoomed
        );
    }

    zoomPlus(): void {
        let scale = this.scale + 0.25;
        if (scale > 1.75) {
            scale = 1.75;
        }
        this.scale = scale;
    }

    zoomMinus(): void {
        let scale = this.scale - 0.25;
        if (scale < 0.25) {
            scale = 0.25;
        }
        this.scale = scale;
    }

    zoomRest(): void {
        this.makeEasyPZ();
    }

    openDetailsDialog(): void {
        this.dialog.open(DetailsComponent, {
            data: this.flow,
        });
    }

    openConfirmDialog(): void {
        if (this.flowService.unsavedChanges) {
            const dialogRef = this.dialog.open(FuseConfirmDialogComponent, {});

            dialogRef.afterClosed().subscribe(confirm => {
                if (confirm) {
                    this.router.navigate(['/home/strategies']);
                }
            })
        } else {
            this.router.navigate(['/home/strategies']);
        }
    }

    onToggleFlowStatus(checked: boolean): void {
        this.flowService.updateEditingFlow(this.flow, { status: checked ? 'active' : 'stopped' });
        this.flowService.saveFlow(true);
    }

    onChangeFlowTitle(title): void {
        // this.flowService.updateEditingFlow(this.flow, { title });
        this.flowsService.updateFlow(this.flowId, this.flow);
    }
}
