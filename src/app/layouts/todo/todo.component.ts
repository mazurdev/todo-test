import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from '@shared/services/data.service';
import {TodoInterface} from '@models/todo.interface';
import {HelperService} from '@shared/services/helper.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ROUTES} from '@shared/helpers/routes';
import {Observable} from 'rxjs';
import {DialogCheckComponent} from '@features/dialog-check/dialog-check.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'td-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  todos$: Observable<TodoInterface[]>;

  constructor(
    private dataService: DataService,
    private helperService: HelperService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todos$ = this.dataService.todos;
    this.dataService.getAllTodos().subscribe(res => {
      this.dataService.dataStore.todos = res;
      this.dataService.todosSubject$.next(Object.assign({}, this.dataService.dataStore).todos);
    }, (e: HttpErrorResponse) => {
      this.helperService.showSnackBar(e.message);
    });
  }

  editTodo(id: string, data: TodoInterface) {
    this.dataService.chosenTodo = {
      id,
      number: data.number,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      editedAt: data.editedAt
    };
    this.router.navigate([ROUTES.TODO + '/' + id]);
  }

  removeTodo(id: string, title: string) {
    this.dialog.open(DialogCheckComponent, {
      autoFocus: true,
      data: {
        id,
        title,
        action: 'remove'
      }
    });
  }

  trackByItem(index, item) {
    return (item.id);
  }

}
