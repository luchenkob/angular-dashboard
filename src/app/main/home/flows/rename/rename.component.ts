import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { FlowsService } from 'app/services/flows.service';

@Component({
    selector: 'app-rename',
    templateUrl: './rename.component.html',
    styleUrls: ['./rename.component.scss'],
})
export class RenameComponent {
    form: FormControl;

    constructor(
        private snackbar: MatSnackBar,
        public dialogRef: MatDialogRef<RenameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IFlow,
        private flowsService: FlowsService
    ) {
        this.form = new FormControl(data.title, [Validators.required]);
    }

    submit(): void {
        // TODO: invalid form show error
        if (this.form.invalid) {
            this.snackbar.open('Invalid form data', 'close', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
                panelClass: ['red-snackbar'],
            });
            return;
        }

        this.flowsService.updateFlow(this.data._id, { title: this.form.value });
        this.dialogRef.close();
    }
}
