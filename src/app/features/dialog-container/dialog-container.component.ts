import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'td-dialog-container',
  template: `
    <td-todo-fields [todoAction]="data.action"></td-todo-fields>
  `
})
export class DialogContainerComponent implements OnInit, OnDestroy {

  todoAction: string;
  todoId: number;
  private sub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private route: ActivatedRoute
  ) {
    this.todoAction = data.action;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.todoId = +params.todoId;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
