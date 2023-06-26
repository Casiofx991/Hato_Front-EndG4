import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Room } from "../models/room.model";

@Injectable({
  providedIn: "root",
})
export class HttpDataService {
  base_url = "http://localhost:8080/api/hato/rooms";

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("An error ocurred: ", error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  getAllRooms(): Observable<Room> {
    return this.http
      .get<Room>(this.base_url)
      .pipe(retry(2), catchError(this.handleError));
  }

  createItem(item: any): Observable<Room> {
    return this.http
      .post<Room>(this.base_url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
