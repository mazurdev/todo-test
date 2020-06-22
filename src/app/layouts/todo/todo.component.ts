import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Self} from '@angular/core';
import {DataService} from '@shared/services/data.service';
import {TodoInterface} from '@models/todo.interface';
import {NgOnDestroy} from '@shared/services/ngOnDestroy.service';
import {takeUntil} from 'rxjs/operators';
import {HelperService} from '@shared/services/helper.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ROUTES} from '@shared/helpers/routes';

@Component({
  selector: 'td-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [NgOnDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  todos$: TodoInterface[];

  constructor(
    private dataService: DataService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Self() private ngOnDestroy$: NgOnDestroy
  ) {}

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.dataService.getAllTodos().pipe(
      takeUntil(this.ngOnDestroy$)
    ).subscribe(res => {
      this.todos$ = res;
      console.log('Todos: ', this.todos$);
      this.cdr.markForCheck();
    }, (e: HttpErrorResponse) => {
      this.helperService.showSnackBar(e.message);
    });
  }

  editTodo(id: string, data: TodoInterface) {
    this.dataService.chosenData = {
      id,
      number: data.number,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      editedAt: data.editedAt
    };
    this.router.navigate([ROUTES.TODO + '/' + id]);
  }

  openTodo(id: string, data: TodoInterface) {
    this.dataService.chosenData = {
      id,
      number: data.number,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      editedAt: data.editedAt
    };
    this.router.navigate([ROUTES.TODO + '/' + id]);
  }

  removeTodo(id: string) {

  }

  trackByItem(index, item) {
    return (item.id);
  }

}
