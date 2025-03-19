import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-page-name-dialog',
  templateUrl: './page-name-dialog.component.html',
  styleUrls: ['./page-name-dialog.component.css']
})
export class PageNameDialogComponent {
  pageName: string = '';

  constructor(public dialogRef: MatDialogRef<PageNameDialogComponent>) {}

  submit() {
    this.dialogRef.close(this.pageName);
  }
}
