import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from '@features/header/header.component';
import {FooterComponent} from '@features/footer/footer.component';
import {LoaderComponent} from '@features/loader/loader.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';

import {DialogContainerComponent} from '@features/dialog-container/dialog-container.component';
import {DialogEntryComponent} from '@features/dialog-entry/dialog-entry.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    DialogContainerComponent,
    DialogEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    DialogContainerComponent,
    DialogEntryComponent
  ]
})
export class FeaturesModule {
}
