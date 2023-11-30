import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {StorageService} from "../storage/storage.service";



const url = ['http://localhost:8080/']
export const AUTH_HEADER = 'authorization'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) {
  }
    isLoggedIn(): boolean {

        return true;
    }

  login(email: String, password: String): Observable<any> {
    return this.http.post(url + 'authenticate', {
      email, password
    }, {observe: "response"}).pipe(
      tap(__ => this.log("User Authentication")),
      map((res: HttpResponse<any>) => {
          this.storage.saveUser(res.body)
          const tokenLenght = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLenght)
          this.storage.saveToken(bearerToken);
          return res;
        }
      )
    )
  }

  log(message: string) {
    console.log(message)
  }
}
