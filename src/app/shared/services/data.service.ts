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
  chosenData: TodoInterface;
  todosSubject$ = new BehaviorSubject<TodoInterface>(null);
  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) {
  }

  get todos() {
    return this.todosSubject$;
  }

  getAllTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.API_URL}/todos`).pipe(
      catchError(this.errorHandler)
    );
  }

  createTodo(todo): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(`${this.API_URL}/todos`, todo).pipe(
      catchError(this.errorHandler)
    );
  }

  updateTodo(id, updatedData): Observable<TodoInterface> {
    return this.http.put<TodoInterface>(`${this.API_URL}/todos/${id}`, updatedData).pipe(
      tap(() => {
        console.log(this.todosSubject$)
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
