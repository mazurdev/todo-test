import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {environment} from '@environments/environment';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TodoInterface} from '@models/todo.interface';
import {catchError, tap} from 'rxjs/operators';
import {HelperService} from '@shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  chosenTodo: TodoInterface;
  private todosSubject$ = new BehaviorSubject<TodoInterface[]>([]);
  readonly TODOS = this.todosSubject$.asObservable();
  private dataStore: { todos: TodoInterface[] } = { todos: [] };
  todosAsInterface: TodoInterface[] = [];
  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) {
  }

  get todos() {
    return this.todosSubject$.asObservable();
  }

  getAllTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.API_URL}/todos`).pipe(
      tap(todos => {
        this.todosAsInterface = todos as TodoInterface[];
        this.dataStore.todos = todos;
        this.todosSubject$.next(Object.assign({}, this.dataStore).todos);
        // this.todosSubject$.next(this.todosAsInterface);
        console.log('getAllTodos in DataService', this.todosSubject$);
      }),
      catchError(this.errorHandler)
    );
  }

  createTodo(newTodo): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(`${this.API_URL}/todos`, newTodo).pipe(
      tap(() => {
        const items = this.todosSubject$.value;
        this.todosSubject$.next([...items, newTodo]);
      }),
      catchError(this.errorHandler)
    );
  }

  updateTodo(id, updatedData): Observable<TodoInterface> {
    return this.http.put<TodoInterface>(`${this.API_URL}/todos/${id}`, updatedData).pipe(
      tap((res) => {
        // this.todosSubject$.next(updatedData);
        this.dataStore.todos.forEach((t, i) => {
          if (t.id === res.id) {
            this.dataStore.todos[i] = res;
          }
        });
        this.todosSubject$.next(Object.assign({}, this.dataStore).todos);
        console.log('updateTodo in DataService', this.todosSubject$);
      }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.helperService.showSnackBar(errorMessage);
    return throwError(errorMessage);
  }

}
