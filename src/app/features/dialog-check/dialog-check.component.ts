import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {DataService} from '@shared/services/data.service';

@Component({
  selector: 'td-dialog-check',
  templateUrl: './dialog-check.component.html',
  styleUrls: ['./dialog-check.component.scss']
})
export class DialogCheckComponent implements OnDestroy {

  private sub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
    private dataService: DataService
  ) {}

  actionTodo(action: string) {
    if (action === 'remove') {
      this.sub = this.dataService.removeTodo(this.data.id).subscribe(() => {
        this.dataService.dataStore.todos.forEach((t, i) => {
          if (t.id === this.data.id) {
            this.dataService.dataStore.todos.splice(i, 1);
          }
        });
        this.dataService.todosSubject$.next(Object.assign({}, this.dataService.dataStore).todos);
      }, e => {
        this.dataService.errorHandler(e);
      }, () => {
        this.dialogRef.closeAll();
      });
    } else {
      const newTodo = {
        id: this.data.id,
        number: this.data.number,
        title: this.data.title,
        description: this.data.description,
        createdAt: new Date(new Date().toLocaleDateString())
      };
      this.sub = this.dataService.createTodo(newTodo).subscribe(res => {
        this.dataService.dataStore.todos.push(res);
        this.dataService.todosSubject$.next(Object.assign({}, this.dataService.dataStore).todos);
      }, e => {
        this.dataService.errorHandler(e);
      }, () => {
        this.dialogRef.closeAll();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
