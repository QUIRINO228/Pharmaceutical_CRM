import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../services/storage/storage.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "http://localhost:8080"
  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<any>{
    return this.http.get<[]>(this.url+ "/users", {headers: this.createAuthorizationHeader()})
  }


    changeUserRole(userId: number, newRole: string | undefined): Observable<any> {
    const url = `${this.url}/users/${userId}/role`;
    const body = { newRole };

    return this.http.put(url, body, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', "Bearer "+ StorageService.getToken()
    );
  }


}
