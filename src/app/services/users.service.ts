import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  userUrl = `${environment.api_url}/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET /users/:id
  getUser (id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url)
    .pipe(
      tap({
        next: _=> { console.log(`fetched user id=${id}`) },
        error: _ => { catchError(this.handleError<User>(`getUser id=${id}`)) },
      })      
    );
  }

  // GET /users
  getUsers () : Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
    .pipe(
      tap({
        next: _=> { console.log('fetched users') },
        error: _ => { catchError(this.handleError<User[]>('getUsers', [])) },
      })
    );
  }

  // POST /users
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions)
    .pipe(
      tap({
        next: (newUser: User) => { console.log(`added user w/ id=${newUser._id}`) },
        error: _ => { catchError(this.handleError<User>('addUser')) },
      })      
    );
  }

  // PUT /users/:id
  updateUser (user: User) : Observable<any> {
    const url = `${this.userUrl}/${user._id}`;
    return this.http.put(url, user, this.httpOptions)
    .pipe(
      tap({
        next: _=> { console.log(`updated user id=${user._id}`) },
        error: _ => { catchError(this.handleError<any>('updateUser')) },
      })      
    );
  }

  // DELETE /users/:id
  deleteUser (id: string) : Observable<User> {
    const url = `${this.userUrl}/${id}`;
  
    return this.http.delete<User>(url, this.httpOptions)
    .pipe(
      tap({
        next: _=> { console.log(`deleted user id=${id}`) },
        error: _ => { catchError(this.handleError<User>('deleteUser')) },
      })      
    );
  }

  private handleError<User>(operation = 'operation', result?: User) {
    return (error: any): Observable<User> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
