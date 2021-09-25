import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public constructor(private dialogRef: MatDialogRef<DialogComponent>) {
  }

  public ngOnInit(): void {
  }

  public dismiss(): void {
    this.dialogRef.close();
  }

}
