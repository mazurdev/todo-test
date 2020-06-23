import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TodoInterface} from '@models/todo.interface';
import {catchError} from 'rxjs/operators';
import {HelperService} from '@shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todosSubject$ = new BehaviorSubject<TodoInterface[]>([]);
  dataStore: { todos: TodoInterface[] } = { todos: [] };
  API_URL = environment.apiUrl;
  chosenTodo: TodoInterface;

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
      catchError(this.errorHandler)
    );
  }

  createTodo(newTodo): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(`${this.API_URL}/todos`, newTodo).pipe(
      catchError(this.errorHandler)
    );
  }

  updateTodo(id: string, updatedData): Observable<TodoInterface> {
    return this.http.put<TodoInterface>(`${this.API_URL}/todos/${id}`, updatedData).pipe(
      catchError(this.errorHandler)
    );
  }

  removeTodo(id: string): Observable<TodoInterface> {
    return this.http.delete<TodoInterface>(`${this.API_URL}/todos/${id}`).pipe(
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
