import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "./User";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(user)
    return this.http.post<User>(`${this.url}/registration`, user, {headers});
  }

  login(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(user);
    return this.http.post<User>(`${this.url}/login`, user, {headers});
  }



}
