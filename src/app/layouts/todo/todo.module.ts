import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TodoRoutingModule} from './todo-routing.module';
import {TodoComponent} from './todo.component';

import {FeaturesModule} from '@features/features.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeaturesModule,
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule {
}
