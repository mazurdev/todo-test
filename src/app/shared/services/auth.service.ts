import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '@models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(authenticate: UserInterface): Observable<any> {
    return this.http.post('http://localhost:3000/login', authenticate);
  }
}
