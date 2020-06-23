import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
// import {DialogCheckComponent} from '@features/dialog-check/dialog-check.component';
// import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private snackBar: MatSnackBar,
    // private dialog: MatDialog,
  ) {
  }

  showSnackBar(message?: HttpErrorResponse | string) {
    if (typeof message === 'string') {
      this.snackBar.open(message, 'Close');
    }
  }

  // openCheckDialog(id, title, action) {
  //   this.dialog.open(DialogCheckComponent, {
  //     autoFocus: true,
  //     data: {
  //       id,
  //       title,
  //       action
  //     }
  //   });
  // }
}
