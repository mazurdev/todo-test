import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogContainerComponent} from '@features/dialog-container/dialog-container.component';

@Component({
  selector: 'td-dialog-entry',
  template: ''
})
export class DialogEntryComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      autoFocus: true,
      data: {
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
