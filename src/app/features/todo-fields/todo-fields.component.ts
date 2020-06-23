import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoInterface} from '@models/todo.interface';
import {DataService} from '@shared/services/data.service';
import {HelperService} from '@shared/services/helper.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogContainerComponent} from '@features/dialog-container/dialog-container.component';
import {Subscription} from 'rxjs';
import {DialogCheckComponent} from '@features/dialog-check/dialog-check.component';

@Component({
  selector: 'td-todo-fields',
  templateUrl: './todo-fields.component.html',
  styleUrls: ['./todo-fields.component.scss']
})
export class TodoFieldsComponent implements OnInit, OnDestroy {

  @Input() todoAction;
  todo$: TodoInterface;
  todoForm: FormGroup;
  private sub: Subscription;
  validationMessages = {
    number: [
      {type: 'pattern', message: 'Number cannot contains letters'},
      {type: 'maxlength', message: 'Number must be not more 8 characters long.'}
    ],
    description: [
      {type: 'maxlength', message: 'Description must be not more 256 characters long.'}
    ]
  };

  constructor(
    private dialogRef: MatDialogRef<DialogContainerComponent>,
    private dialog: MatDialog,
    private dataService: DataService,
    private helperService: HelperService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.todoAction === 'edit') {
      this.todo$ = this.dataService.chosenTodo;
    }
    this.todoForm = this.fb.group({
      number: new FormControl(this.todoAction === 'edit' ? this.todo$.number : '', Validators.compose([
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(8),
      ])),
      title: new FormControl(this.todoAction === 'edit' ? this.todo$.title : ''),
      description: new FormControl(this.todoAction === 'edit' ? this.todo$.description : '', Validators.compose([
        Validators.maxLength(256),
      ]))
    });
  }

  removeTodo() {
    this.dialog.open(DialogCheckComponent, {
      autoFocus: true,
      data: {
        id: this.todo$.id,
        title: this.todo$.title,
        action: 'remove'
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(action, data: TodoInterface) {
    if (!this.todoForm.valid) {
      return;
    }
    if (action === 'edit') {
      const updatedTodo = {
        id: this.todo$.id,
        number: data.number,
        title: data.title,
        description: data.description,
        editedAt: new Date(new Date().toLocaleDateString()),
        createdAt: this.todo$.createdAt
      };
      this.sub = this.dataService.updateTodo(this.todo$.id, updatedTodo).subscribe(res => {
        this.dataService.dataStore.todos.forEach((t, i) => {
          if (t.id === res.id) {
            this.dataService.dataStore.todos[i] = res;
          }
        });
        this.dataService.todosSubject$.next(Object.assign({}, this.dataService.dataStore).todos);
      }, e => {
        this.helperService.showSnackBar(e.error);
      }, () => {
        this.todoForm.reset();
        this.closeDialog();
      });
    }
    if (action === 'create') {
      this.dialog.open(DialogCheckComponent, {
        autoFocus: true,
        data: {
          id: null,
          number: data.number,
          title: data.title,
          description: data.description,
          createdAt: new Date(new Date().toLocaleDateString()),
          action: 'create'
        }
      });
      // const newTodo = {
      //   id: null,
      //   number: data.number,
      //   title: data.title,
      //   description: data.description,
      //   createdAt: new Date(new Date().toLocaleDateString())
      // };
      // this.dataService.createTodo(newTodo).subscribe(res => {
      //   this.dataService.dataStore.todos.push(res);
      //   this.dataService.todosSubject$.next(Object.assign({}, this.dataService.dataStore).todos);
      // }, e => {
      //   this.helperService.showSnackBar(e.error);
      // }, () => {
      //   this.todoForm.reset();
      //   this.closeDialog();
      // });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
