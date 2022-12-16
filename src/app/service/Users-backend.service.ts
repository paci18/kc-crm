import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {User} from "../user/user";



@Injectable({
  providedIn: 'root'
})
export class BackendService {

    private usersUrl = 'http://localhost:8040/user/getUsers'
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
