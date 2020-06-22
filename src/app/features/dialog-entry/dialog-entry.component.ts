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
      maxWidth: '90vw',
      height: 'max-content',
      width: '100%',
      hasBackdrop: true,
      backdropClass: 'custom-modal-backdrop',
      panelClass: 'custom-modal-panel',
      autoFocus: true,
      ariaLabel: 'Custom Modal',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('After Closed res: ', res);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
