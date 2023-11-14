import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "./User";
import {Product} from './Product';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/registration`, user);
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, user);
  }

  addProduct(product: Product){
    return this.http.post<Product>(`${this.url}/add`, product)
  }

  getProduct(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/products`)
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.url}/product/${id}`)
  }

  updateProduct(id?: number ,product?: any): Observable<any>{
    return this.http.put<any>(`${this.url}/update/${id}`, product)
  }

  activate(link : string): void{
    this.http.get<string>(`${this.url}/activate/${link}`)
  }

  getActivateCode(link : string, code: number): number{
    this.http.post<number>(`${this.url}/activate/${link}`, code)
    return code;
  }
}
