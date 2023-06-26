import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Serving } from '../models/serving.model';

@Injectable({
  providedIn: 'root'
})
export class ServingService {
  base_url = 'http://localhost:8080/api/hato/servings';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log('Backend returned code ' + error.status + ', body was:', error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }
   postServing(serving: Serving): Observable<Serving> {
    return this.http.post<Serving>(this.base_url, JSON.stringify(serving), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
    }
}