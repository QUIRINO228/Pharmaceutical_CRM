import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {Product} from './Product';
import {ForgotCodeDTO} from './ForgotCodeDTO'
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from "./components/registration/registration.component";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080"

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }


  openRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, {});
  }

  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<User>(`${this.url}/registration`, user, {headers});
  }

  checkActivateCode(link: string, code: number | null | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}/activate/${link}`, code, {headers});
  }

  forgotMessage(email: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<User>(`${this.url}/forgot`, email, {headers});
  }

  changePassword(link: string, forgotCodeDTO: ForgotCodeDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}/changePassword/${link}`, forgotCodeDTO, {headers});
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }


  addProduct(formData: FormData): Observable<Product> {
    const headers = new HttpHeaders();
    return this.http.post<Product>(`${this.url}/add`, formData, {headers});
  }


  getProduct(): Observable<any[]> {
    const headers = new HttpHeaders();
    return this.http.get<any[]>(`${this.url}/products`, {headers})
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/product/${id}`)
  }

  updateProduct(id?: number, product?: any): Observable<any> {
    return this.http.put<any>(`${this.url}/update/${id}`, product)
  }


}
