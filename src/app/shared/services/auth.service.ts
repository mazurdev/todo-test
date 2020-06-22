import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {UserInterface} from '@models/user.interface';
import {AuthDateInterface} from '@models/auth-date.interface';

import {environment} from '@environments/environment';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ROUTES} from '@shared/helpers/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl;
  private userSubject$ = new BehaviorSubject<UserInterface>(null);
  user$ = this.userSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }

  login(authData: AuthDateInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.API_URL}/login`, authData).pipe(
      tap((user: UserInterface) => {
        this.userSubject$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }));
  }

  logOut() {
    localStorage.removeItem('user');
    this.userSubject$.next(null);
    this.router.navigate([ROUTES.AUTH]);
  }
}
