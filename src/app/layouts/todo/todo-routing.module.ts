import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TodoComponent} from './todo.component';
import {DialogEntryComponent} from '@features/dialog-entry/dialog-entry.component';

const routes: Routes = [
  {
    path: '', component: TodoComponent, children: [
      {
        path: ':todoId',
        component: DialogEntryComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
