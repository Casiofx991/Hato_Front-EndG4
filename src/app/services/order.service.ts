import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  base_url = 'https://hato-back-end.ue.r.appspot.com/api/hato/orders/';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log('Backend returned code ' + error.status + ', body was:', error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  postOrder(order: Order): Observable<Order> {
    const servingIdUrl = 'https://hato-back-end.ue.r.appspot.com/api/hato/servings/lastId';
    return this.http.get<number>(servingIdUrl).pipe(
      switchMap((lastId: number) => {
        const servingUrl = this.base_url + lastId;
        return this.http.post<Order>(servingUrl, JSON.stringify(order), this.httpOptions);
      }),
      retry(2),
      catchError(this.handleError)
    );
  }
  
  getLastOrder(): Observable<number> {
    const lastOrderIdUrl = this.base_url + 'o/lastId';
    return this.http.get<number>(lastOrderIdUrl);
  }

  getOrderById(id: Observable<number>): Observable<Order> {
    return id.pipe(
      switchMap((orderId: number) => {
        const orderUrl = this.base_url + orderId;
        return this.http.get<Order>(orderUrl);
      }),
      catchError(this.handleError)
    );
  }
}
