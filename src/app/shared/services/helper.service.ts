import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
// import {MatDialog} from '@angular/material/dialog';
// import {DialogContainerComponent} from '@features/dialog-container/dialog-container.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {


  constructor(
    private snackBar: MatSnackBar,
    // private dialog: MatDialog,
  ) {
  }

  showSnackBar(message: HttpErrorResponse | string) {
    if (typeof message === 'string') {
      this.snackBar.open(message, 'Close');
    }
  }

  // openDialogContainer(type, id?, data?) {
  //   this.dialog.open(DialogContainerComponent, {
  //     maxWidth: '90vw',
  //     height: 'max-content',
  //     width: '100%',
  //     hasBackdrop: true,
  //     backdropClass: 'custom-modal-backdrop',
  //     panelClass: 'custom-modal-panel',
  //     autoFocus: true,
  //     ariaLabel: 'Custom Modal',
  //     data: {
  //       type,
  //       title: data
  //     }
  //   });
  // }
}
