// core
import {Component} from '@angular/core';
// utils
import {Subject} from 'rxjs';
import {LoaderService} from '@shared/services/loader.service';

@Component({
  selector: 'td-loader',
  template: `
    <div *ngIf="isLoading | async" class="overlay">
      <mat-progress-spinner class="spinner" [color]="color" [mode]="mode" [value]="value" aria-label="Progress"></mat-progress-spinner>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  color = '#673ab7';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService
  ) {}

}
