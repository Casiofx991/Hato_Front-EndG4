import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  base_url = 'http://localhost:8080/api/hato/payments';
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
  

  postPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.base_url, JSON.stringify(payment), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
