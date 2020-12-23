import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-rename",
    templateUrl: "./rename.component.html",
    styleUrls: ["./rename.component.scss"],
})
export class RenameComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<RenameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
    ngOnInit(): void {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface DialogData {
    title: string;
}
