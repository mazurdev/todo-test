import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TodoInterface} from '@models/todo.interface';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {DataService} from '@shared/services/data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '@shared/services/helper.service';

@Component({
  selector: 'td-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent implements OnInit, OnDestroy {

  editTodoForm: FormGroup;
  validationMessages = {
    number: [
      {type: 'pattern', message: 'Number cannot contains letters'},
      {type: 'maxlength', message: 'Number must be not more 8 characters long.'}
    ],
    description: [
      {type: 'maxlength', message: 'Description must be not more 256 characters long.'}
    ]
  };

  todoId: number;
  todo$: TodoInterface;
  private sub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TodoInterface,
    private dialogRef: MatDialogRef<DialogContainerComponent>,
    private route: ActivatedRoute,
    private dataService: DataService,
    private helperService: HelperService,
    private fb: FormBuilder
  ) {
    this.todo$ = this.dataService.chosenTodo;
    console.log('TODO data in Container Dialog: ', this.todo$);
    this.editTodoForm = fb.group({
      number: new FormControl(this.todo$.number, Validators.compose([
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(8),
      ])),
      title: new FormControl(this.todo$.title),
      description: new FormControl(this.todo$.description, Validators.compose([
        Validators.maxLength(256),
      ]))
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.todoId = +params.todoId;
    });
  }

  // createTodo(todo) {
  //   this.dataService.createTodo(todo);
  // }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(data: TodoInterface) {
    if (!this.editTodoForm.valid) {
      return;
    }
    const updatedTodo = {
      id: this.todo$.id,
      number: data.number,
      title: data.title,
      description: data.description,
      editedAt: new Date(new Date().toLocaleDateString())
    };
    console.log('updatedTodo in Modal: ', updatedTodo);
    this.dataService.updateTodo(this.todo$.id, updatedTodo).subscribe((res) => {
      console.log('Edit result', res);
      // console.log('this.dataService.todosSubject$.getValue();', this.dataService.todosSubject$.getValue());
    }, e => {
      this.helperService.showSnackBar(e.error);
    }, () => {
      this.editTodoForm.reset();
      this.closeDialog();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
