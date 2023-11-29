import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../../services/storage/storage.service";
import {Observable} from "rxjs";
import {Product} from "../../../../Product";
import {AddproductComponent} from "../../../../components/addproduct/addproduct.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private url = "http://localhost:8080"

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }




  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', "Bearer " + StorageService.getToken()
    );
  }

}
