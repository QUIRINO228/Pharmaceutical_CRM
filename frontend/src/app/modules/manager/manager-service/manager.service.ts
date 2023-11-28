import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../services/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private url = "http://localhost:8080"
  constructor(private http: HttpClient) { }










  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', "Bearer "+ StorageService.getToken()
    );
  }

}
