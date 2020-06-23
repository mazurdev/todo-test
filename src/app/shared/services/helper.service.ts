import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private snackBar: MatSnackBar
  ) {}

  showSnackBar(message?: HttpErrorResponse | string) {
    if (typeof message === 'string') {
      this.snackBar.open(message, 'Close');
    }
  }

}
