import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Add this line
    });

    return this.http.post<any>(`${this.url}/registration`, user, { headers });
  }
}
