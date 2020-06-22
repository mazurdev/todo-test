import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    // utils
    FormsModule,
    ReactiveFormsModule,
    // material
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    // utils
    FormsModule,
    ReactiveFormsModule,
    // material
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class SharedModule {}
