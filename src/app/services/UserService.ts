import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_url = 'https://hato-back-end.ue.r.appspot.com/api/v1/users/';
  user: User = { username: '', password: '', email: '', plan: '' };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error ocurred: ', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  updateUserPlan(plan: string) {
    this.user.plan = plan;
  }

  createUser(): Observable<User> {
    return this.http
      .post<User>(this.base_url, this.user, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
